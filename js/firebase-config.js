// Firebase設定とデータベース初期化

// Firebase設定 - 後で置き換え
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  databaseURL: "https://your-project-default-rtdb.firebaseio.com/",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};

// Firebaseの初期化
const database = firebase.database();
console.log("Firebase initialized");

// Sample data（初期セットアップ用）
const sampleJobs = {
  job_001: {
    title: "Senior Frontend Developer",
    company: "TechNova Japan",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    location: "Tokyo",
    remote: true,
    category: "software development",
    workType: "full-time",
    salary: {
      min: 6000000,
      max: 9000000,
      display: "¥6M - ¥9M"
    },
    description: "We are looking for an experienced Frontend Developer to join our growing team. You will be responsible for building modern web applications using React and TypeScript.",
    contactEmail: "careers@technova.jp",
    postedAt: Date.now(),
    status: "active",
    applications: 0,
    views: 0,
    featured: true
  },
  job_002: {
    title: "UI/UX Designer",
    company: "DesignCorp",
    skills: ["Figma", "Sketch", "Adobe XD", "Prototyping"],
    location: "Osaka",
    workType: "part-time",
    remote: false,
    category: "design",
    salary: {
      min: 4500000,
      max: 7000000,
      display: "¥4.5M - ¥7M"
    },
    description: "Join our design team to create beautiful and intuitive user experiences for our mobile and web applications.",
    contactEmail: "design@designcorp.com",
    postedAt: Date.now() - 86400000, // 1 day ago
    status: "active",
    applications: 5,
    views: 23,
    featured: false
  },
  job_003: {
    title: "Product Manager",
    company: "StartupX",
    skills: ["Product Strategy", "Data Analysis", "Agile", "User Research"],
    location: "Remote",
    workType: "full-time",
    remote: true,
    category: "product",
    salary: {
      min: 7000000,
      max: 10000000,
      display: "¥7M - ¥10M"
    },
    description: "Lead product development for our innovative SaaS platform. Work with engineering and design teams to deliver exceptional user experiences.",
    contactEmail: "pm@startupx.co.jp",
    postedAt: Date.now() - 172800000, // 2 days ago
    status: "active",
    applications: 12,
    views: 89,
    featured: true
  },
  job_004: {
    title: "Full Stack Engineer",
    company: "DataFlow Inc",
    skills: ["Node.js", "React", "MongoDB", "AWS"],
    location: "Tokyo",
    workType: "full-time",
    remote: true,
    category: "software development",
    salary: {
      min: 5500000,
      max: 8500000,
      display: "¥5.5M - ¥8.5M"
    },
    description: "Build scalable web applications and APIs for our data analytics platform. Experience with cloud technologies preferred.",
    contactEmail: "engineering@dataflow.com",
    postedAt: Date.now() - 259200000, // 3 days ago
    status: "active",
    applications: 8,
    views: 45,
    featured: false
  },
  job_005: {
    title: "Marketing Specialist",
    company: "GrowthLab",
    skills: ["Digital Marketing", "SEO", "Content Creation", "Analytics"],
    location: "Kyoto",
    workType: "part-time",
    remote: true,
    category: "marketing",
    salary: {
      min: 4000000,
      max: 6000000,
      display: "¥4M - ¥6M"
    },
    description: "Drive growth through innovative marketing strategies. Experience with B2B SaaS marketing is a plus.",
    contactEmail: "marketing@growthlab.jp",
    postedAt: Date.now() - 432000000, // 5 days ago
    status: "active",
    applications: 15,
    views: 67,
    featured: false
  }
};

// 初期データのセットアップ関数
function setupInitialData(){
  // 既存のデータがあるか確認
  database.ref('jobs').once('value', (snapshot) => {
    if(!snapshot.exists()){
      console.log("Setting up initial data...");
      database.ref('jobs').set(sampleJobs).then(() => {
        console.log("Initial data setup complete.");
      }).catch((error) => {
        console.error("Error setting up initial data: ", error);
      });
    } else {
      console.log("Initial data already exists. No setup needed.");
    }
  });
}

// 初期データのセットアップを実行
if(window.location.hostname ==='localhost' || window.location.hostname ==='127.0.0.1'){
  // ローカル環境でのみ初期データをセットアップ
  setupInitialData();
}