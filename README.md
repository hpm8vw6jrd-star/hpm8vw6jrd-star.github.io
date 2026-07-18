# 対訳文庫 (Taiyaku Bunko)

パブリックドメインの海外古典を、**原文と新しい日本語訳の対訳**で無料公開する静的サイトです。

公開URL: <https://hpm8vw6jrd-star.github.io/>

## 収録作品

- フランツ・カフカ『変身』
- シャーロット・パーキンス・ギルマン『黄色い壁紙』
- W・W・ジェイコブズ『猿の手』
- トマス・ペイン『コモン・センス』
- ケイト・ショパン『デジレの赤ちゃん』
- ジェイムズ・ジョイス『アラビー』
- ケイト・ショパン『一時間の物語』
- ジェイムズ・ジョイス『エヴリン』
- サキ『開いた窓』
- サキ『スレドニ・ヴァシュタール』
- キャサリン・マンスフィールド『パーカーおばさんの人生』
- キャサリン・マンスフィールド『ミス・ブリル』
- キャサリン・マンスフィールド『はじめての舞踏会』
- キャサリン・マンスフィールド『歌の稽古』
- ヴァージニア・ウルフ『幽霊屋敷』
- ヴァージニア・ウルフ『キュー植物園』
- ヴァージニア・ウルフ『壁のしみ』
- ヴァージニア・ウルフ『月曜日か火曜日』
- ヴァージニア・ウルフ『弦楽四重奏』
- ヴァージニア・ウルフ『青と緑』
- サキ『宝船』
- サキ『最も無情な一撃』
- サキ『クローヴィス、親の責任を語る』
- サキ『従姉のテレサ』
- サキ『ヤルカンド流』
- サキ『ネメシスの祭日』
- サキ『慈善家と幸福な猫』
- サキ『物語る者たち』
- キャサリン・マンスフィールド『祝日』
- キャサリン・マンスフィールド『奥様付きの侍女』

## 構成

```text
taiyaku-bunko/
├── index.html              # 検索・絞り込み対応の蔵書一覧
├── site.js                 # テーマ切替・蔵書検索・共通UI
├── style.css               # 共通デザイン
├── DESIGN.md               # getdesign.md / Notionを基にしたデザイン正本
├── reader.js               # 対訳表示・文字サイズ・保存・しおり・進捗
├── <slug>.html             # 作品ページ
├── <slug>-data.js          # 対訳データ（window.BOOK）
├── about.html              # 編集方針
├── privacy.html            # 解析・広告・Cookie方針
├── 404.html                # GitHub Pages用404
├── sitemap.xml / robots.txt
└── assets/
    ├── favicon.svg
    ├── og-cover.svg
    └── og-cover.png
```

## デザイン

`getdesign.md` の Notion design analysis が示す warm minimalism / serif headings / soft surfaces を、オンライン文庫向けに翻案しています。色・書体・余白・コンポーネントの正本は `DESIGN.md` です。画面用にはライト／ダークの両テーマがあります。

## ローカルで見る

`index.html` をブラウザで開くだけで動きます。データは `*-data.js` に埋め込まれているため、ローカルサーバーは不要です。

## 作品を追加する

1. `<slug>.html` を既存作品から作り、固有の title / description / canonical / OGP / JSON-LD を設定する。
2. `<slug>-data.js` に `window.BOOK` を置く。
3. `index.html` の `#library-list` に `.work-entry` を追加する。検索対象語は `data-search`、作家絞り込みは `data-author`、並び順は `data-order` に入れる。
4. トップページの JSON-LD `ItemList` と作品数を更新する。
5. `sitemap.xml` と本READMEの作品一覧を更新する。
6. モバイル幅とデスクトップ幅で表示を確認する。

## SEO

- 各ページに固有の title / description / canonical / OGP を設定。
- トップは `WebSite` + `CollectionPage` + `ItemList`、作品は `Book` の JSON-LD を掲載。
- `sitemap.xml` に `lastmod` を記録。
- 1200×630のOG画像、favicon、Web App Manifestを配信。
- 作品名と作家名はJavaScript生成だけにせず、HTML本文にも保持する。

## Google AdSense

AdSenseコード、`ads.txt`、プライバシーポリシー、空時非表示の広告領域を設定済みです。広告配信はGoogleのサイト審査完了後に始まります。

AdSense 登録用の公開URLは、パスを含まないユーザーサイト `hpm8vw6jrd-star.github.io` のルートを使用します。

有効化時は次を行います。

1. AdSenseのサイト登録で表示された公式コードを、全HTMLの `head` にそのまま追加する。
2. AdSenseが示す行をルートの `ads.txt` に追加する。
3. `privacy.html` の「導入を予定」を現在形へ更新する。
4. Auto adsを利用し、本文や操作バーに重ならないことをモバイルでも確認する。

## 権利

- 原文テキストは、個別に著作権保護期間と出典を確認したパブリックドメイン作品です。
- 日本語訳は本サイトのために新しく作成し、AIの支援を利用したことを明記しています。
