// Firebase real time databaseとの統合

$(document).ready(function() {
  console.log("Firebase integration script loaded");

  // グローバル変数
  let allJobs = {};
  let filteredJobs = {};

  // selectors
  const SELECTORS = {
    jobCardContainer: "[data-component='job-card-container']",
    jobCount: "[data-component='job-count']",
    loadingState: "#loading-state",
    sponsoredContent: "[data-component='sponsored-content']"
  };

  // firebase接続状態の監視
  const connectedRef = database.ref(".info/connected");
  connectedRef.on("value", function(snapshot) {
    if (snapshot.val() === true) {
      console.log("Connected to Firebase");
    } else {
      console.log("Disconnected from Firebase");
    }
  });

  // 求人データのリアルタイム監視
  function initializeJobListening() {
    const jobsRef = database.ref("jobs");

    // 初回データの読込
    jobsRef.once("value", (snapshot) => {
      const jobs = snapshot.val();
      if(jobs){
        allJobs = jobs;
        displayJobs(Object.values(jobs));
        updateJobCount(Object.keys(jobs).length);
      }
      hideLoadingState();
    });

    // リアルタイム更新の監視
    jobsRef.on('child_added', (snapshot, prevChildKey)=>{
      const newJob = snapshot.val();
      const JobId = snapshot.key;

      // 既存のデータ読込後の新規追加のみ処理
      if(allJobs[jobId])return;

      allJobs[jobId] = newJob;
      addJobToDisplay(newJob, true);
      updateJobCount(Object.keys(allJobs).length);
    });

    // 求人一覧の表示
    function displayJobs(jobs) {
      const $container = $(SELECTORS.jobCardContainer);
      const $sponsoredContent = $(SELECTORS.sponsoredContent);

      // 既存の求人カードをクリア(Sponsored contentは除く)
      $container.find('[data-component="job-card"]').remove();

      // 求人を投稿日時順にソート（新しい順）A Bを引き算で比較して答えが正の数ならBが先に来る
      const sortedJobs = jobs.sort((a, b) => (b.postedAt || 0) - (a.postedAt || 0));
    }




  }
});

