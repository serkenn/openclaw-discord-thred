const JAPANESE_LOCALE_PREFIX = "ja";

type Params = Record<string, string | number>;

function normalizeLocale(value: string | undefined): string {
  return (value ?? "").trim().toLowerCase();
}

export function isJapanese(): boolean {
  const lang = normalizeLocale(process.env.OPENCLAW_LANG || process.env.LANG);
  return lang === JAPANESE_LOCALE_PREFIX || lang.startsWith(`${JAPANESE_LOCALE_PREFIX}_`);
}

const TRANSLATIONS: Record<string, string> = {
  "OpenClaw onboarding": "OpenClaw オンボーディング",
  "Setup cancelled.": "セットアップをキャンセルしました。",
  "Auto": "自動",
  "LAN": "LAN",
  "Yes": "はい",
  "No": "いいえ",
  "Security": "セキュリティ",
  "Security warning — please read.": "セキュリティ警告 — 必ずお読みください。",
  "OpenClaw is a hobby project and still in beta. Expect sharp edges.":
    "OpenClaw は趣味プロジェクトで、まだベータ版です。未整備な点があります。",
  "This bot can read files and run actions if tools are enabled.":
    "ツールを有効にすると、このボットはファイルを読み取り、アクションを実行できます。",
  "A bad prompt can trick it into doing unsafe things.":
    "不適切なプロンプトで危険な操作をさせられる可能性があります。",
  "If you’re not comfortable with basic security and access control, don’t run OpenClaw.":
    "基本的なセキュリティやアクセス制御に不安がある場合、OpenClaw の利用は推奨しません。",
  "Ask someone experienced to help before enabling tools or exposing it to the internet.":
    "ツールを有効化したり、インターネット公開する前に、経験者へ相談してください。",
  "Recommended baseline:": "推奨の基本設定:",
  "- Pairing/allowlists + mention gating.": "- ペアリング/許可リスト + メンション必須",
  "- Sandbox + least-privilege tools.": "- サンドボックス + 最小権限のツール",
  "- Keep secrets out of the agent’s reachable filesystem.": "- シークレットをエージェントの到達可能なファイルシステムに置かない",
  "- Use the strongest available model for any bot with tools or untrusted inboxes.":
    "- ツールや未信頼の受信箱を使うボットは最も強力なモデルを使用",
  "Run regularly:": "定期的に実行:",
  "Must read: https://docs.openclaw.ai/gateway/security":
    "必読: https://docs.openclaw.ai/gateway/security",
  "I understand this is powerful and inherently risky. Continue?":
    "これは強力で本質的に危険であることを理解しました。続行しますか？",
  "Invalid config": "不正な設定",
  "Config issues": "設定の問題",
  "Config invalid. Run `{cmd}` to repair it, then re-run onboarding.":
    "設定が不正です。`{cmd}` を実行して修復してから、オンボーディングを再実行してください。",
  "Configure details later via {cmd}.": "詳細は後で {cmd} から設定できます。",
  "Configure port, network, Tailscale, and auth options.":
    "ポート、ネットワーク、Tailscale、認証オプションを設定します。",
  "Invalid --flow (use quickstart, manual, or advanced).":
    "無効な --flow です（quickstart / manual / advanced を指定してください）。",
  "Onboarding mode": "オンボーディングのモード",
  "QuickStart": "クイックスタート",
  "Manual": "手動",
  "QuickStart only supports local gateways. Switching to Manual mode.":
    "クイックスタートはローカルゲートウェイのみ対応です。手動モードに切り替えます。",
  "Existing config detected": "既存の設定が見つかりました",
  "Config handling": "設定の扱い",
  "Use existing values": "既存の値を使う",
  "Update values": "値を更新する",
  "Reset": "リセット",
  "Reset scope": "リセット範囲",
  "Config only": "設定のみ",
  "Config + creds + sessions": "設定 + 認証情報 + セッション",
  "Full reset (config + creds + sessions + workspace)":
    "完全リセット（設定 + 認証情報 + セッション + ワークスペース）",
  "QuickStart": "クイックスタート",
  "Keeping your current gateway settings:": "現在のゲートウェイ設定を維持します:",
  "Gateway port: {port}": "ゲートウェイポート: {port}",
  "Gateway bind: {bind}": "ゲートウェイバインド: {bind}",
  "Gateway custom IP: {ip}": "ゲートウェイのカスタムIP: {ip}",
  "Gateway auth: {auth}": "ゲートウェイ認証: {auth}",
  "Tailscale exposure: {mode}": "Tailscale 公開: {mode}",
  "Direct to chat channels.": "チャットチャンネルに直接接続します。",
  "Gateway bind: Loopback (127.0.0.1)": "ゲートウェイバインド: ループバック (127.0.0.1)",
  "Gateway auth: Token (default)": "ゲートウェイ認証: トークン（既定）",
  "Tailscale exposure: Off": "Tailscale 公開: オフ",
  "Loopback (127.0.0.1)": "ループバック (127.0.0.1)",
  "Custom IP": "カスタムIP",
  "Tailnet (Tailscale IP)": "Tailnet (Tailscale IP)",
  "Token (default)": "トークン（既定）",
  "Password": "パスワード",
  "Off": "オフ",
  "Serve": "Serve",
  "Funnel": "Funnel",
  "What do you want to set up?": "どれを設定しますか？",
  "Local gateway (this machine)": "ローカルゲートウェイ（このマシン）",
  "Remote gateway (info-only)": "リモートゲートウェイ（情報のみ）",
  "Gateway reachable ({url})": "ゲートウェイ到達可能（{url}）",
  "No gateway detected ({url})": "ゲートウェイ未検出（{url}）",
  "No remote URL configured yet": "リモートURLは未設定です",
  "Configured but unreachable ({url})": "設定済みですが到達不能（{url}）",
  "Remote gateway configured.": "リモートゲートウェイを設定しました。",
  "Workspace directory": "ワークスペースディレクトリ",
  "Skipping channel setup.": "チャンネル設定をスキップします。",
  "Channels": "チャンネル",
  "Skipping skills setup.": "スキル設定をスキップします。",
  "Skills": "スキル",
  "Limit Discord to a single server/channel thread?":
    "Discord を単一のサーバー/チャンネル/スレッドに限定しますか？",
  "Discord server (guild) ID": "Discord サーバー（guild）ID",
  "Discord channel ID (parent channel)": "Discord チャンネルID（親チャンネル）",
  "Discord thread ID": "Discord スレッドID",
  "Discord channels": "Discord チャンネル",
  "Configured Discord allowlist for a single thread.":
    "Discord を単一スレッドの許可リストに設定しました。",
  "Server (guild): {id}": "サーバー（guild）: {id}",
  "Channel: {id} (blocked)": "チャンネル: {id}（ブロック）",
  "Thread: {id} (allowed)": "スレッド: {id}（許可）",
  "Required": "必須",
  "Use a numeric Discord ID": "数値の Discord ID を指定してください",
  "Allowlist (recommended)": "許可リスト（推奨）",
  "Open (allow all channels)": "オープン（全チャンネル許可）",
  "Disabled (block all channels)": "無効（全チャンネル拒否）",
  "{label} access": "{label} のアクセス",
  "{label} allowlist (comma-separated)": "{label} の許可リスト（カンマ区切り）",
  "Configure {label} access?": "{label} のアクセス設定を行いますか？",
  "Update {label} access?": "{label} のアクセス設定を更新しますか？",
  "Model/auth provider": "モデル/認証プロバイダ",
  "No auth methods available for that provider.": "このプロバイダで利用可能な認証方法がありません。",
  "Model/auth choice": "モデル/認証の選択",
  "{label} auth method": "{label} の認証方法",
  "Back": "戻る",
  "Gateway port": "ゲートウェイポート",
  "Invalid port": "無効なポートです",
  "Gateway bind": "ゲートウェイバインド",
  "LAN (0.0.0.0)": "LAN (0.0.0.0)",
  "Auto (Loopback → LAN)": "自動（ループバック → LAN）",
  "Custom IP address": "カスタムIPアドレス",
  "Gateway auth": "ゲートウェイ認証",
  "Token": "トークン",
  "Recommended default (local + remote)": "推奨の既定（ローカル + リモート）",
  "Tailscale exposure": "Tailscale 公開",
  "No Tailscale exposure": "Tailscale 公開なし",
  "Private HTTPS for your tailnet (devices on Tailscale)": "Tailnet 内デバイス向けのプライベート HTTPS",
  "Public HTTPS via Tailscale Funnel (internet)": "Tailscale Funnel による公開 HTTPS（インターネット）",
  "Tailscale binary not found in PATH or /Applications.":
    "Tailscale のバイナリが PATH または /Applications で見つかりません。",
  "Ensure Tailscale is installed from:": "Tailscale を次からインストールしてください:",
  "You can continue setup, but serve/funnel will fail at runtime.":
    "設定は続行できますが、実行時に serve/funnel が失敗します。",
  "Tailscale Warning": "Tailscale 警告",
  "Tailscale": "Tailscale",
  "Reset Tailscale serve/funnel on exit?": "終了時に Tailscale serve/funnel をリセットしますか？",
  "Tailscale requires bind=loopback. Adjusting bind to loopback.":
    "Tailscale には bind=loopback が必要です。ループバックに変更します。",
  "Note": "注意",
  "Tailscale funnel requires password auth.": "Tailscale funnel にはパスワード認証が必要です。",
  "Gateway token (blank to generate)": "ゲートウェイトークン（空欄で自動生成）",
  "Needed for multi-machine or non-loopback access": "複数マシンまたは非ループバックアクセスに必要です",
  "Gateway password": "ゲートウェイパスワード",
  "default (primary)": "既定（プライマリ）",
  "Modify settings": "設定を変更",
  "Disable (keeps config)": "無効化（設定は保持）",
  "Delete config": "設定を削除",
  "Skip (leave as-is)": "スキップ（変更なし）",
  "{label} already configured. What do you want to do?":
    "{label} は既に設定済みです。どうしますか？",
  "{label} account": "{label} アカウント",
  "configured (plugin disabled)": "設定済み（プラグイン無効）",
  "not configured": "未設定",
  "configured · plugin disabled": "設定済み · プラグイン無効",
  "install plugin to enable": "有効にするにはプラグインをインストール",
  "plugin · install": "プラグイン · インストール",
  "Channel status": "チャンネルの状態",
  "DM security: default is pairing; unknown DMs get a pairing code.":
    "DM セキュリティ: 既定はペアリング。未知のDMはペアリングコードが届きます。",
  "Approve with: {cmd}": "承認: {cmd}",
  "Public DMs require dmPolicy=\"open\" + allowFrom=[\"*\"].":
    "公開DMには dmPolicy=\"open\" + allowFrom=[\"*\"] が必要です。",
  "Multi-user DMs: run: {cmd} (or \"per-account-channel-peer\" for multi-account channels) to isolate sessions.":
    "複数ユーザーDM: {cmd} を実行（複数アカウントのチャンネルは \"per-account-channel-peer\"）してセッションを分離。",
  "How channels work": "チャンネルの仕組み",
};

export function t(key: string, params?: Params): string {
  const base = isJapanese() ? TRANSLATIONS[key] ?? key : key;
  if (!params) {
    return base;
  }
  return base.replace(/\{(\w+)\}/g, (match, token) => {
    const value = params[token];
    return value === undefined ? match : String(value);
  });
}

export function translatePromptText(value: string | undefined): string | undefined {
  if (value === undefined) {
    return value;
  }
  return t(value);
}
