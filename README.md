# 🦞 OpenClaw — 個人用AIアシスタント

<p align="center">
    <picture>
        <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/openclaw/openclaw/main/docs/assets/openclaw-logo-text-dark.png">
        <img src="https://raw.githubusercontent.com/openclaw/openclaw/main/docs/assets/openclaw-logo-text.png" alt="OpenClaw" width="500">
    </picture>
</p>

<p align="center">
  <strong>EXFOLIATE! EXFOLIATE!</strong>
</p>

<p align="center">
  <a href="https://github.com/openclaw/openclaw/actions/workflows/ci.yml?branch=main"><img src="https://img.shields.io/github/actions/workflow/status/openclaw/openclaw/ci.yml?branch=main&style=for-the-badge" alt="CI status"></a>
  <a href="https://github.com/openclaw/openclaw/releases"><img src="https://img.shields.io/github/v/release/openclaw/openclaw?include_prereleases&style=for-the-badge" alt="GitHub release"></a>
  <a href="https://discord.gg/clawd"><img src="https://img.shields.io/discord/1456350064065904867?label=Discord&logo=discord&logoColor=white&color=5865F2&style=for-the-badge" alt="Discord"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge" alt="MIT License"></a>
</p>

**OpenClaw** は、自分の端末で動かす _個人用AIアシスタント_ です。
WhatsApp、Telegram、Slack、Discord、Google Chat、Signal、iMessage、Microsoft Teams、WebChat など、普段使っているチャンネルで応答できます。拡張チャンネルとして BlueBubbles、Matrix、Zalo、Zalo Personal にも対応。macOS/iOS/Android で音声の読み上げや会話ができ、操作可能なライブ Canvas も利用できます。Gateway はあくまで制御プレーンで、主役は「アシスタント」です。

ローカルで、速くて、常時稼働する **自分専用のアシスタント** が欲しいなら、これです。

[Website](https://openclaw.ai) · [Docs](https://docs.openclaw.ai) · [Vision](VISION.md) · [DeepWiki](https://deepwiki.com/openclaw/openclaw) · [Getting Started](https://docs.openclaw.ai/start/getting-started) · [Updating](https://docs.openclaw.ai/install/updating) · [Showcase](https://docs.openclaw.ai/start/showcase) · [FAQ](https://docs.openclaw.ai/start/faq) · [Wizard](https://docs.openclaw.ai/start/wizard) · [Nix](https://github.com/openclaw/nix-openclaw) · [Docker](https://docs.openclaw.ai/install/docker) · [Discord](https://discord.gg/clawd)

推奨の手順はターミナルでオンボーディングウィザード（`openclaw onboard`）を実行することです。
ウィザードが Gateway、ワークスペース、チャンネル、スキルの設定を段階的に案内します。
CLI ウィザードは **macOS / Linux / Windows（WSL2 推奨）** で動作します。
`npm` / `pnpm` / `bun` のいずれでも利用できます。
初めての方はこちら: [Getting started](https://docs.openclaw.ai/start/getting-started)

## スポンサー

| OpenAI                                                            | Blacksmith                                                                   |
| ----------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| [![OpenAI](docs/assets/sponsors/openai.svg)](https://openai.com/) | [![Blacksmith](docs/assets/sponsors/blacksmith.svg)](https://blacksmith.sh/) |

**サブスクリプション（OAuth）:**

- **[Anthropic](https://www.anthropic.com/)**（Claude Pro/Max）
- **[OpenAI](https://openai.com/)**（ChatGPT/Codex）

モデルの推奨: どのモデルでも動きますが、長文コンテキストとプロンプトインジェクション耐性の観点で **Anthropic Pro/Max（100/200）+ Opus 4.6** を強く推奨しています。詳細は [Onboarding](https://docs.openclaw.ai/start/onboarding)。

## モデル（選択と認証）

- モデル設定とCLI: [Models](https://docs.openclaw.ai/concepts/models)
- 認証プロファイルのローテーション（OAuth vs APIキー）とフォールバック: [Model failover](https://docs.openclaw.ai/concepts/model-failover)

## インストール（推奨）

ランタイム: **Node ≥22**。

```bash
npm install -g openclaw@latest
# or: pnpm add -g openclaw@latest

openclaw onboard --install-daemon
```

ウィザードが Gateway をデーモン（launchd/systemd user service）として導入し、常時稼働させます。

## 日本語でオンボーディングする

オンボーディングを日本語で実行する場合は、環境変数を指定してください。

```bash
OPENCLAW_LANG=ja openclaw onboard
# または
LANG=ja_JP.UTF-8 openclaw onboard
```

## インストール後（Debian/Ubuntu）

`.deb` を入れた後に何をすればいいか分からない場合は、以下を実行してください。

1. オンボーディングウィザードで認証とチャンネルを設定:

```bash
openclaw onboard
```

2. Discord を **特定スレッドだけ** に限定する場合:

- **Limit Discord to a single server/channel thread?** → `Yes`
- **Server (guild) ID**, **Channel ID（親チャンネル）**, **Thread ID** を入力

3. Gateway が動いているか確認:

```bash
openclaw gateway status
```

4. テスト送信:

```bash
openclaw agent --message "Hello from OpenClaw"
```

ヒント:
- Discord の ID 取得は Developer Mode を有効にして “Copy ID” を使用します。  
  Docs: https://docs.openclaw.ai/channels/discord
- deb でサービスが導入されていれば、すでに動いている場合があります。必要なら再起動:

```bash
openclaw gateway restart
```

補足:
- 初回インストール時は依存関係の `npm install` が走るため少し時間がかかります。
- もし「plugin not available」が出た場合は、次を実行してください:

```bash
cd /opt/openclaw
npm install --omit=dev
cd /opt/openclaw/extensions/discord
npm install --omit=dev
```

## クイックスタート（TL;DR）

ランタイム: **Node ≥22**。

初心者向けの完全ガイド（認証、ペアリング、チャンネル）: [Getting started](https://docs.openclaw.ai/start/getting-started)

```bash
openclaw onboard --install-daemon

openclaw gateway --port 18789 --verbose

# メッセージ送信
openclaw message send --to +1234567890 --message "Hello from OpenClaw"

# アシスタントと会話（必要なら WhatsApp/Telegram/Slack/Discord/Google Chat/Signal/iMessage/BlueBubbles/Microsoft Teams/Matrix/Zalo/Zalo Personal/WebChat に配送）
openclaw agent --message "Ship checklist" --thinking high
```

アップグレードする場合: [Updating guide](https://docs.openclaw.ai/install/updating)（`openclaw doctor` も推奨）。

## 開発チャンネル

- **stable**: タグ付きリリース（`vYYYY.M.D` または `vYYYY.M.D-<patch>`）、npm dist-tag `latest`。
- **beta**: プレリリースタグ（`vYYYY.M.D-beta.N`）、npm dist-tag `beta`（macOSアプリが無い場合あり）。
- **dev**: `main` の最新（公開時は npm dist-tag `dev`）。

切り替え: `openclaw update --channel stable|beta|dev`。
詳細: [Development channels](https://docs.openclaw.ai/install/development-channels)。

## ソースから（開発）

ビルドは `pnpm` 推奨。TypeScript 直実行に `bun` も利用可能。

```bash
git clone https://github.com/openclaw/openclaw.git
cd openclaw

pnpm install
pnpm ui:build # 初回はUI依存を自動インストール
pnpm build

pnpm openclaw onboard --install-daemon

# 開発ループ（TS変更で自動リロード）
pnpm gateway:watch
```

注: `pnpm openclaw ...` は TypeScript を直接実行します（`tsx`）。`pnpm build` は `dist/` を生成し、Node やパッケージ版 `openclaw` バイナリで実行できます。

## セキュリティのデフォルト（DMアクセス）

OpenClaw は実際のメッセージング環境と接続されます。受信DMは **未信頼入力** として扱ってください。

詳細: [Security](https://docs.openclaw.ai/gateway/security)

Telegram/WhatsApp/Signal/iMessage/Microsoft Teams/Discord/Google Chat/Slack の既定動作:

- **DM ペアリング**（`dmPolicy="pairing"` / `channels.discord.dmPolicy="pairing"` / `channels.slack.dmPolicy="pairing"`; 旧: `channels.discord.dm.policy`, `channels.slack.dm.policy`）
  未知の送信者にはペアリングコードが返され、そのメッセージは処理されません。
- 承認: `openclaw pairing approve <channel> <code>`（送信者がローカルの許可リストに追加されます）。
- 公開DMを許可する場合は明示的な設定が必要: `dmPolicy="open"` にし、`allowFrom` もしくは `channels.discord.allowFrom` / `channels.slack.allowFrom` に `"*"` を含める（旧: `channels.discord.dm.allowFrom`, `channels.slack.dm.allowFrom`）。

`openclaw doctor` で危険/不整合のあるDM設定を検出できます。

## 特徴

- **[Local-first Gateway](https://docs.openclaw.ai/gateway)** — セッション、チャンネル、ツール、イベントを管理する単一の制御プレーン。
- **[Multi-channel inbox](https://docs.openclaw.ai/channels)** — WhatsApp、Telegram、Slack、Discord、Google Chat、Signal、BlueBubbles（iMessage）、iMessage（legacy）、Microsoft Teams、Matrix、Zalo、Zalo Personal、WebChat、macOS、iOS/Android。
- **[Multi-agent routing](https://docs.openclaw.ai/gateway/configuration)** — 受信チャンネル/アカウント/相手ごとにエージェントを分離。
- **[Voice Wake](https://docs.openclaw.ai/nodes/voicewake) + [Talk Mode](https://docs.openclaw.ai/nodes/talk)** — macOS/iOS/Android の常時音声。
- **[Live Canvas](https://docs.openclaw.ai/platforms/mac/canvas)** — エージェント操作型のビジュアルワークスペース（[A2UI](https://docs.openclaw.ai/platforms/mac/canvas#canvas-a2ui)）。
- **[First-class tools](https://docs.openclaw.ai/tools)** — ブラウザ、Canvas、ノード、cron、セッション、Discord/Slack アクション。
- **[Companion apps](https://docs.openclaw.ai/platforms/macos)** — macOS メニューバーアプリ + iOS/Android ノード。
- **[Onboarding](https://docs.openclaw.ai/start/wizard) + [skills](https://docs.openclaw.ai/tools/skills)** — ウィザード導入 + スキル管理。

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=openclaw/openclaw&type=date&legend=top-left)](https://www.star-history.com/#openclaw/openclaw&type=date&legend=top-left)

## これまでの構成（概要）

### コアプラットフォーム

- [Gateway WS control plane](https://docs.openclaw.ai/gateway) とセッション、プレゼンス、設定、cron、webhooks、[Control UI](https://docs.openclaw.ai/web)、[Canvas host](https://docs.openclaw.ai/platforms/mac/canvas#canvas-a2ui)。
- [CLI surface](https://docs.openclaw.ai/tools/agent-send): gateway、agent、send、[wizard](https://docs.openclaw.ai/start/wizard)、[doctor](https://docs.openclaw.ai/gateway/doctor)。
- RPC モードの Pi エージェントランタイム（ツール/ブロックストリーミング）。
- セッションモデル: `main`（DM）、グループ分離、アクティベーション、キューモード、返信配信。詳細: [Groups](https://docs.openclaw.ai/concepts/groups)。
- メディアパイプライン: 画像/音声/動画、文字起こしフック、サイズ制限、一時ファイル管理。詳細: [Audio](https://docs.openclaw.ai/nodes/audio)。

### チャンネル

- [Channels](https://docs.openclaw.ai/channels): [WhatsApp](https://docs.openclaw.ai/channels/whatsapp)（Baileys）、[Telegram](https://docs.openclaw.ai/channels/telegram)（grammY）、[Slack](https://docs.openclaw.ai/channels/slack)（Bolt）、[Discord](https://docs.openclaw.ai/channels/discord)（discord.js）、[Google Chat](https://docs.openclaw.ai/channels/googlechat)（Chat API）、[Signal](https://docs.openclaw.ai/channels/signal)（signal-cli）、[BlueBubbles](https://docs.openclaw.ai/channels/bluebubbles)（iMessage推奨）、[iMessage](https://docs.openclaw.ai/channels/imessage)（legacy imsg）、[Microsoft Teams](https://docs.openclaw.ai/channels/msteams)（拡張）、[Matrix](https://docs.openclaw.ai/channels/matrix)（拡張）、[Zalo](https://docs.openclaw.ai/channels/zalo)（拡張）、[Zalo Personal](https://docs.openclaw.ai/channels/zalouser)（拡張）、[WebChat](https://docs.openclaw.ai/web/webchat)。
- [Group routing](https://docs.openclaw.ai/concepts/group-messages): メンションゲート、返信タグ、チャンネル別の分割とルーティング。詳細: [Channels](https://docs.openclaw.ai/channels)。

### アプリ + ノード

- [macOS app](https://docs.openclaw.ai/platforms/macos): メニューバー制御、[Voice Wake](https://docs.openclaw.ai/nodes/voicewake)/PTT、[Talk Mode](https://docs.openclaw.ai/nodes/talk) オーバーレイ、[WebChat](https://docs.openclaw.ai/web/webchat)、デバッグ、[remote gateway](https://docs.openclaw.ai/gateway/remote)。
- [iOS node](https://docs.openclaw.ai/platforms/ios): [Canvas](https://docs.openclaw.ai/platforms/mac/canvas)、[Voice Wake](https://docs.openclaw.ai/nodes/voicewake)、[Talk Mode](https://docs.openclaw.ai/nodes/talk)、カメラ、画面録画、Bonjour ペアリング。
- [Android node](https://docs.openclaw.ai/platforms/android): [Canvas](https://docs.openclaw.ai/platforms/mac/canvas)、[Talk Mode](https://docs.openclaw.ai/nodes/talk)、カメラ、画面録画、SMS（任意）。
- [macOS node mode](https://docs.openclaw.ai/nodes): system.run/notify + canvas/camera。

### ツール + 自動化

- [Browser control](https://docs.openclaw.ai/tools/browser): 専用Chrome/Chromium、スナップショット、操作、アップロード、プロファイル。
- [Canvas](https://docs.openclaw.ai/platforms/mac/canvas): [A2UI](https://docs.openclaw.ai/platforms/mac/canvas#canvas-a2ui) の push/reset、eval、snapshot。
- [Nodes](https://docs.openclaw.ai/nodes): カメラ、画面録画、[location.get](https://docs.openclaw.ai/nodes/location-command)、通知。
- [Cron + wakeups](https://docs.openclaw.ai/automation/cron-jobs)、[webhooks](https://docs.openclaw.ai/automation/webhook)、[Gmail Pub/Sub](https://docs.openclaw.ai/automation/gmail-pubsub)。
- [Skills platform](https://docs.openclaw.ai/tools/skills): bundled/managed/workspace スキル。

### ランタイム + セーフティ

- [Channel routing](https://docs.openclaw.ai/concepts/channel-routing)、[retry policy](https://docs.openclaw.ai/concepts/retry)、[streaming/chunking](https://docs.openclaw.ai/concepts/streaming)。
- [Presence](https://docs.openclaw.ai/concepts/presence)、[typing indicators](https://docs.openclaw.ai/concepts/typing-indicators)、[usage tracking](https://docs.openclaw.ai/concepts/usage-tracking)。
- [Models](https://docs.openclaw.ai/concepts/models)、[model failover](https://docs.openclaw.ai/concepts/model-failover)、[session pruning](https://docs.openclaw.ai/concepts/session-pruning)。
- [Security](https://docs.openclaw.ai/gateway/security) と [troubleshooting](https://docs.openclaw.ai/channels/troubleshooting)。

### 運用 + パッケージング

- [Control UI](https://docs.openclaw.ai/web) + [WebChat](https://docs.openclaw.ai/web/webchat) を Gateway から提供。
- [Tailscale Serve/Funnel](https://docs.openclaw.ai/gateway/tailscale) または [SSH tunnels](https://docs.openclaw.ai/gateway/remote) とトークン/パスワード認証。
- [Nix mode](https://docs.openclaw.ai/install/nix) による宣言的設定、[Docker](https://docs.openclaw.ai/install/docker)。
- [Doctor](https://docs.openclaw.ai/gateway/doctor) による移行/修復、[logging](https://docs.openclaw.ai/logging)。

## 仕組み（短く）

```
WhatsApp / Telegram / Slack / Discord / Google Chat / Signal / iMessage / BlueBubbles / Microsoft Teams / Matrix / Zalo / Zalo Personal / WebChat
               │
               ▼
┌───────────────────────────────┐
│            Gateway            │
│       (control plane)         │
│     ws://127.0.0.1:18789      │
└──────────────┬────────────────┘
               │
               ├─ Pi agent (RPC)
               ├─ CLI (openclaw …)
               ├─ WebChat UI
```
