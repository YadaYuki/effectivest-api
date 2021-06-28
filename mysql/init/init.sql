create database effectivest;
use effectivest;
ALTER DATABASE `effectivest` default character set utf8mb4;
create table question (
    question_id integer primary key AUTO_INCREMENT,
    question varchar(40) not null,
    answer varchar(40) not null,
    tested_times integer default 0 check(tested_times >= 0),
    correct_times integer default 0 check(correct_times >= 0),
    correct_rate float default 0 check(correct_rate >= 0),
    created_on datetime default CURRENT_TIMESTAMP,
    updated_on datetime on update CURRENT_TIMESTAMP,
    test_id integer references test(test_id)
);
ALTER TABLE question CONVERT TO CHARACTER SET utf8mb4;
create table test(
    test_id integer primary key AUTO_INCREMENT,
    testname varchar(40) not null,
    description varchar(300) not null,
    - - question_num integer default 1 check(question_num >= 1),
    created_on datetime default CURRENT_TIMESTAMP,
    -- goal_point integer default 1,
    -- limit_on created_on datetime,
    user_id integer references user(user_Id)
);
ALTER TABLE test CONVERT TO CHARACTER SET utf8mb4;
create table user(
    user_id integer primary key AUTO_INCREMENT,
    username varchar(40) unique not null,
    password char(60) not null,
    email varchar(40) not null,
    registered_on datetime default CURRENT_TIMESTAMP
);
ALTER TABLE user CONVERT TO CHARACTER SET utf8mb4;
create table result(
    result_id integer primary key AUTO_INCREMENT,
    tested_on datetime default CURRENT_TIMESTAMP,
    point integer not null,
    max_point integer not null,
    correct_rate float not null,
    test_id integer not null references test(test_id),
    user_id integer not null references user(user_id)
);
ALTER TABLE result CONVERT TO CHARACTER SET utf8mb4;
create table mistake(
    mistake_id integer primary key AUTO_INCREMENT,
    result_id integer not null references result(result_id),
    question_id integer not null references question(question_id)
);
ALTER TABLE mistake CONVERT TO CHARACTER SET utf8mb4;
INSERT INTO `user`
VALUES (
        1,
        'yadayuki',
        '$2b$10$5Aiqds5/k5Brwiz7C54xfOGGxRZIjSdaVNsCviNfpCULrZdmDfp4i',
        'yada.yuki@fuji.waseda.jp',
        '2020-04-04 16:03:05'
    );
insert into test (testname, description, user_id)
values("TOEIC", "TOEIC勉強用。今年中に900越え", 1);
insert into test (testname, description, user_id)
values("Linuxコマンド", "コマンド勉強用", 1);
insert into test (testname, description, user_id)
values("ドラえもん検定", "ご自由にどうぞ。", 1);
INSERT INTO `question`
VALUES (
        3,
        '行われた',
        'administer',
        48,
        0,
        0,
        '2020-04-04 16:14:11',
        '2020-04-06 12:20:17',
        1
    ),
(
        4,
        '前方に',
        'ahead',
        47,
        0,
        0,
        '2020-04-04 16:14:11',
        '2020-04-06 12:20:17',
        1
    ),
(
        5,
        '廊下',
        'aisle',
        49,
        1,
        0.1,
        '2020-04-04 16:14:11',
        '2020-04-06 12:20:17',
        1
    ),
(
        6,
        '代数',
        'algebra',
        47,
        0,
        0,
        '2020-04-04 16:14:11',
        '2020-04-06 12:20:17',
        1
    ),
(
        7,
        '割り当てる',
        'allocate',
        43,
        0,
        0,
        '2020-04-04 16:14:11',
        '2020-04-06 12:20:17',
        1
    ),
(
        8,
        '修正する',
        'amend',
        47,
        0,
        0,
        '2020-04-04 16:14:11',
        '2020-04-06 12:20:17',
        1
    ),
(
        9,
        '今はもう',
        'anymore',
        44,
        0,
        0,
        '2020-04-04 16:14:11',
        '2020-04-06 12:20:17',
        1
    ),
(
        10,
        'Aに適用される',
        '\"applied to A\"',
        43,
        0,
        0,
        '2020-04-04 16:14:11',
        '2020-04-06 12:20:17',
        1
    ),
(
        11,
        '申し込む',
        '\"apply for\"',
        49,
        0,
        0,
        '2020-04-04 16:14:11',
        '2020-04-06 12:20:17',
        1
    ),
(
        12,
        '感謝する',
        'appreciate',
        43,
        0,
        0,
        '2020-04-04 16:14:11',
        '2020-04-06 12:20:17',
        1
    ),
(
        13,
        '見習い',
        'apprenticeship',
        47,
        0,
        0,
        '2020-04-04 16:14:11',
        '2020-04-06 12:20:17',
        1
    ),
(
        14,
        'である限り',
        '\"as long as\"',
        45,
        0,
        0,
        '2020-04-04 16:14:11',
        '2020-04-06 12:20:17',
        1
    ),
(
        15,
        '担当社員',
        'associate',
        49,
        1,
        0.0769231,
        '2020-04-04 16:14:11',
        '2020-04-06 12:20:17',
        1
    ),
(
        16,
        '試み',
        'attempt',
        47,
        0,
        0,
        '2020-04-04 16:14:11',
        '2020-04-06 12:20:17',
        1
    ),
(
        17,
        '参加者',
        'attendee',
        41,
        0,
        0,
        '2020-04-04 16:14:11',
        '2020-04-06 12:20:17',
        1
    ),
(
        18,
        '権限',
        'authorization',
        47,
        0,
        0,
        '2020-04-04 16:14:11',
        '2020-04-06 12:20:17',
        1
    ),
(
        19,
        'サイン',
        'autograph',
        49,
        0,
        0,
        '2020-04-04 16:14:11',
        '2020-04-06 12:20:17',
        1
    ),
(
        20,
        '熱烈な',
        'avid',
        47,
        0,
        0,
        '2020-04-04 16:14:11',
        '2020-04-06 12:20:17',
        1
    ),
(
        21,
        '待っている',
        'await',
        43,
        0,
        0,
        '2020-04-04 16:14:11',
        '2020-04-06 12:20:17',
        1
    ),
(
        22,
        '日よけ',
        'awining',
        54,
        0,
        0,
        '2020-04-04 16:14:11',
        '2020-04-06 12:20:17',
        1
    ),
(
        23,
        '取り壊される',
        '\"be demolished\"',
        51,
        0,
        0,
        '2020-04-04 16:14:11',
        '2020-04-06 12:20:17',
        1
    ),
(
        24,
        '請求書を送る',
        'billed',
        46,
        0,
        0,
        '2020-04-04 16:14:11',
        '2020-04-06 12:20:17',
        1
    ),
(
        25,
        '最高賞',
        '\"blue ribbon\"',
        44,
        0,
        0,
        '2020-04-04 16:14:11',
        '2020-04-06 12:20:17',
        1
    ),
(
        26,
        '花束',
        'bonquet',
        50,
        0,
        0,
        '2020-04-04 16:14:11',
        '2020-04-06 12:20:17',
        1
    ),
(
        27,
        '小規模の専門店',
        'boutique',
        46,
        0,
        0,
        '2020-04-04 16:14:11',
        '2020-04-06 12:20:17',
        1
    ),
(
        28,
        'レンガの',
        'brick',
        45,
        0,
        0,
        '2020-04-04 16:14:11',
        '2020-04-06 12:20:17',
        1
    ),
(
        29,
        '色鮮やかな',
        'bright',
        46,
        0,
        0,
        '2020-04-04 16:14:11',
        '2020-04-06 12:20:17',
        1
    ),
(
        30,
        '掲示板',
        'bulttein',
        49,
        0,
        0,
        '2020-04-04 16:14:11',
        '2020-04-06 12:20:17',
        1
    ),
(
        31,
        '釜山',
        'Busan',
        48,
        0,
        0,
        '2020-04-04 16:14:11',
        '2020-04-06 12:20:17',
        1
    ),
(
        32,
        '大工',
        'carpentry',
        50,
        0,
        0,
        '2020-04-04 16:14:11',
        '2020-04-06 12:20:17',
        1
    ),
(
        33,
        '資格のある',
        'certified',
        46,
        0,
        0,
        '2020-04-04 16:14:11',
        '2020-04-06 12:20:17',
        1
    ),
(
        34,
        '切る',
        'chop',
        45,
        1,
        0.1,
        '2020-04-04 16:14:11',
        '2020-04-06 12:20:17',
        1
    ),
(
        35,
        '最高級の',
        'classic',
        49,
        0,
        0,
        '2020-04-04 16:14:11',
        '2020-04-06 12:20:17',
        1
    ),
(
        36,
        '柱',
        'column',
        43,
        1,
        0.1,
        '2020-04-04 16:14:11',
        '2020-04-06 12:20:17',
        1
    ),
(
        37,
        '心地よさ',
        'comfort',
        47,
        0,
        0,
        '2020-04-04 16:14:11',
        '2020-04-06 12:20:17',
        1
    ),
(
        38,
        '心地よい',
        'comfortable',
        53,
        0,
        0,
        '2020-04-04 16:14:11',
        '2020-04-06 12:20:17',
        1
    ),
(
        39,
        'を記念する',
        'commemorate',
        51,
        0,
        0,
        '2020-04-04 16:14:11',
        '2020-04-06 12:20:17',
        1
    ),
(
        40,
        '商業上の',
        'commercial',
        44,
        0,
        0,
        '2020-04-04 16:14:11',
        '2020-04-06 12:20:17',
        1
    ),
(
        41,
        '能力',
        'competency',
        52,
        0,
        0,
        '2020-04-04 16:14:11',
        '2020-04-06 12:20:17',
        1
    ),
(
        42,
        '敬意を表する',
        'compliment',
        47,
        0,
        0,
        '2020-04-04 16:14:11',
        '2020-04-06 12:20:17',
        1
    ),
(
        43,
        '包括的な',
        'comprehensive',
        50,
        0,
        0,
        '2020-04-04 16:14:11',
        '2020-04-06 12:20:17',
        1
    ),
(
        44,
        '連続した',
        'consecutive',
        47,
        0,
        0,
        '2020-04-04 16:14:11',
        '2020-04-06 12:20:17',
        1
    ),
(
        45,
        'かなり',
        'considerably',
        43,
        1,
        0.0909091,
        '2020-04-04 16:14:11',
        '2020-04-06 12:20:17',
        1
    ),
(
        46,
        '現代の',
        'contemporary',
        47,
        0,
        0,
        '2020-04-04 16:14:11',
        '2020-04-06 12:20:17',
        1
    ),
(
        47,
        '請負業者',
        'contractor',
        43,
        0,
        0,
        '2020-04-04 16:14:11',
        '2020-04-06 12:20:17',
        1
    ),
(
        48,
        '会議場',
        '\"convention center\"',
        45,
        0,
        0,
        '2020-04-04 16:14:11',
        '2020-04-06 12:20:17',
        1
    ),
(
        49,
        '収束する',
        'converge',
        46,
        0,
        0,
        '2020-04-04 16:14:11',
        '2020-04-06 12:20:17',
        1
    ),
(
        50,
        '調理器具',
        'cookware',
        46,
        0,
        0,
        '2020-04-04 16:14:11',
        '2020-04-06 12:20:17',
        1
    ),
(
        51,
        '敬具',
        'Cordially',
        47,
        0,
        0,
        '2020-04-04 16:14:11',
        '2020-04-06 12:20:17',
        1
    ),
(
        52,
        '対応する',
        'correspond',
        46,
        0,
        0,
        '2020-04-04 16:14:11',
        '2020-04-06 12:20:17',
        1
    ),
(
        53,
        '礼儀',
        'courtesy',
        45,
        0,
        0,
        '2020-04-04 16:14:11',
        '2020-04-06 12:20:17',
        1
    ),
(
        54,
        '手工芸品',
        'craft',
        46,
        1,
        0.0909091,
        '2020-04-04 16:14:11',
        '2020-04-06 12:20:17',
        1
    ),
(
        55,
        '資格',
        'credential',
        51,
        0,
        0,
        '2020-04-04 16:14:11',
        '2020-04-06 12:20:17',
        1
    ),
(
        56,
        '評論家',
        'critic',
        51,
        0,
        0,
        '2020-04-04 16:14:11',
        '2020-04-06 12:20:17',
        1
    ),
(
        57,
        '料理の',
        'culinary',
        50,
        0,
        0,
        '2020-04-04 16:14:11',
        '2020-04-06 12:20:17',
        1
    ),
(
        58,
        '装飾的な',
        'decorative',
        46,
        0,
        0,
        '2020-04-04 16:14:11',
        '2020-04-06 12:20:17',
        1
    ),
(
        59,
        '否決する',
        'defeat',
        49,
        0,
        0,
        '2020-04-04 16:14:11',
        '2020-04-06 12:20:17',
        1
    ),
(
        60,
        '預ける',
        'deposit',
        49,
        0,
        0,
        '2020-04-04 16:14:11',
        '2020-04-06 12:20:17',
        1
    ),
(
        61,
        '示される',
        'designate',
        52,
        0,
        0,
        '2020-04-04 16:14:11',
        '2020-04-06 12:20:17',
        1
    ),
(
        62,
        '生じた',
        'developed',
        50,
        0,
        0,
        '2020-04-04 16:14:11',
        '2020-04-06 12:20:17',
        1
    ),
(
        63,
        '図表',
        'diagram',
        48,
        0,
        0,
        '2020-04-04 16:14:11',
        '2020-04-06 12:20:17',
        1
    ),
(
        64,
        '寸法',
        'dimension',
        49,
        0,
        0,
        '2020-04-04 16:14:11',
        '2020-04-06 12:20:17',
        1
    ),
(
        65,
        '廃棄される',
        'discarded',
        46,
        0,
        0,
        '2020-04-04 16:14:11',
        '2020-04-06 12:20:17',
        1
    ),
(
        66,
        '裁量権',
        'discretion',
        45,
        0,
        0,
        '2020-04-04 16:14:11',
        '2020-04-06 12:20:17',
        1
    ),
(
        67,
        '分散した',
        'dispersed',
        44,
        0,
        0,
        '2020-04-04 16:14:11',
        '2020-04-06 12:20:17',
        1
    ),
(
        68,
        '通りに沿っていったところ',
        '\"down the street\"',
        45,
        1,
        0.125,
        '2020-04-04 16:14:11',
        '2020-04-06 12:20:17',
        1
    ),
(
        69,
        '水はけ',
        'drainage',
        56,
        0,
        0,
        '2020-04-04 16:14:11',
        '2020-04-06 12:20:17',
        1
    ),
(
        70,
        '\"下書き、草案\"',
        'draft',
        50,
        0,
        0,
        '2020-04-04 16:18:07',
        '2020-04-06 12:20:17',
        1
    ),
(
        72,
        '大きな関心を集める',
        '\"draw much interest\"',
        46,
        1,
        0.111111,
        '2020-04-04 16:18:07',
        '2020-04-06 12:20:17',
        1
    ),
(
        73,
        'sample',
        'サンプル',
        21,
        0,
        0,
        '2020-04-06 11:39:09',
        '2020-04-06 12:20:17',
        1
    ),
(
        74,
        'sample',
        'サンプル',
        16,
        0,
        0,
        '2020-04-06 11:44:25',
        '2020-04-06 12:20:17',
        1
    );
/* linux command */
insert into question (question, answer, test_id)
values ("ファイル・フォルダの一覧を表示", "ls", 2);
insert into question (question, answer, test_id)
values ("ファイルやディレクトリのリンクを作成する", "ln", 2);
insert into question (question, answer, test_id)
values ("条件に合う名前のファイルを検索する", "find", 2);
insert into question (question, answer, test_id)
values ("ファイル・ディレクトリをコピーする", "cp", 2);
insert into question (question, answer, test_id)
values ("ファイル・ディレクトリの移動・名前変更", "mv", 2);
insert into question (question, answer, test_id)
values ("ファイル・フォルダの権限を変更する", "chmod", 2);
insert into question (question, answer, test_id)
values ("プロセスの表示", "ps", 2);
insert into question (question, answer, test_id)
values ("カレントディレクトリを表示", "pwd", 2);
/*Doraemon Test*/
insert into question (question, answer, test_id)
values ("のび太のパパのフルネームは?", "野比のび助", 3);
insert into question (question, answer, test_id)
values ("のび太のママの旧姓は?", "片岡", 3);
insert into question (question, answer, test_id)
values ("スネ夫の弟の名前は?", "スネツグ", 3);
insert into question (question, answer, test_id)
values ("のび太の特技。射的・昼寝　あと一つは?", "あやとり", 3);
insert into question (question, answer, test_id)
values ("鏡に移したもの全く同じものをを鏡の中から取り出せる。何という道具", "フエルミラー", 3);
insert into question (question, answer, test_id)
values ("考えずとも模範解答を自動で書いてくれるペン。何という道具?", "コンピュータペンシル", 3);
insert into question (question, answer, test_id)
values ("若かりし頃ののび太のパパは何を目指していた?", "画家", 3);
insert into question (question, answer, test_id)
values ("ドラえもんのガールフレンドの猫の名前は?", "ミイちゃん", 3);
insert into question (question, answer, test_id)
values ("タケコプターは漫画初期、何という名前だった?", "ヘリトンボ", 3);
insert into question (question, answer, test_id)
values ("ドラえもんはSF漫画。SFは何の略?", "少し不思議", 3);