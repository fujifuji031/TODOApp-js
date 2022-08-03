import "./styles.css";

const onClickAdd = () => {
  //テキストボックスの値を取得し、初期化する
  const inputText = document.getElementById("add-text").value;
  document.getElementById("add-text").value = "";

  createIncompleteList(inputText);
};

//未完了リストから指定の要素を削除
const deleteFromIncompleteList = (target) => {
  console.log(target);
  document.getElementById("incomplete-list").removeChild(target);
};

//未完了リストに追加する関数
const createIncompleteList = (text) => {
  //liタブ生成
  const li = document.createElement("li");

  //div生成(createElementでタブ生成)
  const div = document.createElement("div");
  div.className = "list-row";

  //pタグ生成、innerTextでinputTextをpタグ内に入れる
  const p = document.createElement("p");
  p.innerText = text;

  //button(完了)タグ生成
  const completeButton = document.createElement("button");
  completeButton.innerText = "完了";
  //完了ボタンが押された時の処理
  completeButton.addEventListener("click", () => {
    deleteFromIncompleteList(div.parentNode);

    //完了リストに追加する要素
    const addTarget = completeButton.parentNode;
    //TODO内容テキストを取得
    const text = addTarget.firstElementChild.innerText;

    //div以下を初期化
    addTarget.textContent = null;
    //console.log(addTarget);

    //liタグを生成
    const li = document.createElement("li");

    //divタグを生成（上でdivを使っているのでdiと命名）
    const di = document.createElement("div");
    di.className = "list-row";

    //pタグを生成
    const p = document.createElement("p");
    p.innerText = text;

    //button(戻す)タグを生成
    const backButton = document.createElement("button");
    backButton.innerText = "戻す";
    backButton.addEventListener("click", () => {
      //押された戻すボタンの親タグ(li)を完了リストから削除
      const deleteTarget = di.parentNode;
      //console.log(di.parentNode);
      document.getElementById("complete-list").removeChild(deleteTarget);

      //テキストを取得
      const text = deleteTarget.firstElementChild.firstElementChild.innerText;
      //console.log(text);

      createIncompleteList(text);
    });

    li.appendChild(di);

    di.appendChild(p);
    di.appendChild(backButton);

    document.getElementById("complete-list").appendChild(li);
  });

  //button(削除)タグ生成
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  //削除ボタンが押された時の処理
  deleteButton.addEventListener("click", () => {
    //親タグ(li)を未完了リストから削除
    deleteFromIncompleteList(div.parentNode);
    // const deleteTarget = div.parentNode; //parentNodeで親タグ情報を取得(今回はdivタグの親タグliを取得)
    // //removeChildでincomplete-listからdeleteTarget(li)を削除
    // document.getElementById("incomplete-list").removeChild(deleteTarget);
  });

  //liタブの子要素に各要素を設定
  li.appendChild(div);

  //divタグの子要素に各要素を設定(appendChildで子要素に設定)
  div.appendChild(p);
  div.appendChild(completeButton);
  div.appendChild(deleteButton);

  //未完了リストに追加
  document.getElementById("incomplete-list").appendChild(li);
};

//追加ボタンが押されたとき、onClickAddを呼ぶ
document
  .getElementById("add-button")
  .addEventListener("click", () => onClickAdd());
