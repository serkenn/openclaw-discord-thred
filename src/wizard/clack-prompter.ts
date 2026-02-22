import {
  autocompleteMultiselect,
  cancel,
  confirm,
  intro,
  isCancel,
  multiselect,
  type Option,
  outro,
  select,
  spinner,
  text,
} from "@clack/prompts";
import { createCliProgress } from "../cli/progress.js";
import { stripAnsi } from "../terminal/ansi.js";
import { note as emitNote } from "../terminal/note.js";
import { stylePromptHint, stylePromptMessage, stylePromptTitle } from "../terminal/prompt-style.js";
import { theme } from "../terminal/theme.js";
import { translatePromptText } from "./i18n.js";
import type { WizardProgress, WizardPrompter } from "./prompts.js";
import { WizardCancelledError } from "./prompts.js";

function guardCancel<T>(value: T | symbol): T {
  if (isCancel(value)) {
    const message = translatePromptText("Setup cancelled.") ?? "Setup cancelled.";
    cancel(stylePromptTitle(message) ?? message);
    throw new WizardCancelledError();
  }
  return value;
}

function normalizeSearchTokens(search: string): string[] {
  return search
    .toLowerCase()
    .split(/\s+/)
    .map((token) => token.trim())
    .filter((token) => token.length > 0);
}

function buildOptionSearchText<T>(option: Option<T>): string {
  const label = stripAnsi(option.label ?? "");
  const hint = stripAnsi(option.hint ?? "");
  const value = String(option.value ?? "");
  return `${label} ${hint} ${value}`.toLowerCase();
}

export function tokenizedOptionFilter<T>(search: string, option: Option<T>): boolean {
  const tokens = normalizeSearchTokens(search);
  if (tokens.length === 0) {
    return true;
  }
  const haystack = buildOptionSearchText(option);
  return tokens.every((token) => haystack.includes(token));
}

export function createClackPrompter(): WizardPrompter {
  return {
    intro: async (title) => {
      const message = translatePromptText(title) ?? title;
      intro(stylePromptTitle(message) ?? message);
    },
    outro: async (message) => {
      const translated = translatePromptText(message) ?? message;
      outro(stylePromptTitle(translated) ?? translated);
    },
    note: async (message, title) => {
      emitNote(
        translatePromptText(message) ?? message,
        translatePromptText(title) ?? title,
      );
    },
    select: async (params) =>
      guardCancel(
        await select({
          message: stylePromptMessage(translatePromptText(params.message) ?? params.message),
          options: params.options.map((opt) => {
            const base = { value: opt.value, label: translatePromptText(opt.label) ?? opt.label };
            if (opt.hint === undefined) {
              return base;
            }
            const hint = translatePromptText(opt.hint) ?? opt.hint;
            return { ...base, hint: stylePromptHint(hint) };
          }) as Option<(typeof params.options)[number]["value"]>[],
          initialValue: params.initialValue,
        }),
      ),
    multiselect: async (params) => {
      const options = params.options.map((opt) => {
        const base = { value: opt.value, label: translatePromptText(opt.label) ?? opt.label };
        if (opt.hint === undefined) {
          return base;
        }
        const hint = translatePromptText(opt.hint) ?? opt.hint;
        return { ...base, hint: stylePromptHint(hint) };
      }) as Option<(typeof params.options)[number]["value"]>[];

      if (params.searchable) {
        return guardCancel(
          await autocompleteMultiselect({
            message: stylePromptMessage(translatePromptText(params.message) ?? params.message),
            options,
            initialValues: params.initialValues,
            filter: tokenizedOptionFilter,
          }),
        );
      }

      return guardCancel(
        await multiselect({
          message: stylePromptMessage(translatePromptText(params.message) ?? params.message),
          options,
          initialValues: params.initialValues,
        }),
      );
    },
    text: async (params) => {
      const validate = params.validate;
      return guardCancel(
        await text({
          message: stylePromptMessage(translatePromptText(params.message) ?? params.message),
          initialValue: params.initialValue,
          placeholder: params.placeholder,
          validate: validate ? (value) => validate(value ?? "") : undefined,
        }),
      );
    },
    confirm: async (params) =>
      guardCancel(
        await confirm({
          message: stylePromptMessage(translatePromptText(params.message) ?? params.message),
          initialValue: params.initialValue,
        }),
      ),
    progress: (label: string): WizardProgress => {
      const translatedLabel = translatePromptText(label) ?? label;
      const spin = spinner();
      spin.start(theme.accent(translatedLabel));
      const osc = createCliProgress({
        label: translatedLabel,
        indeterminate: true,
        enabled: true,
        fallback: "none",
      });
      return {
        update: (message) => {
          const translated = translatePromptText(message) ?? message;
          spin.message(theme.accent(translated));
          osc.setLabel(translated);
        },
        stop: (message) => {
          osc.done();
          const translated = translatePromptText(message ?? "") ?? message;
          spin.stop(translated);
        },
      };
    },
  };
}
