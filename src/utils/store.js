const IPFS = require("ipfs");
const OrbitDB = require("orbit-db");

// Configuration for IPFS instance
const ipfsConfig = {
  repo: "/orbitdb/examples/todomvc/ipfs/0.27.0",
  EXPERIMENTAL: {
    pubsub: true
  },
  config: {
    Addresses: {
      Swarm: [
        // Use IPFS dev signal server
        "/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star"
      ]
    }
  }
};

// Configuration for the database
const dbConfig = {
  // If database doesn't exist, create it
  create: true,
  // Don't wait to load from the network
  sync: false,
  // Load only the local version of the database
  localOnly: true,
  // Allow anyone to write to the database,
  // otherwise only the creator of the database can write
  admin: ["*"],
  write: ["*"]
};

const store = async name => {
  return new Promise((resolve, reject) => {
    // Create IPFS instance
    const ipfs = new IPFS(ipfsConfig);

    ipfs.on("error", e => console.error(e));
    ipfs.on("ready", async () => {
      try {
        // Create an OrbitDB instance
        const orbitdb = new OrbitDB(ipfs);
        // Open (or create) database
        const db = await orbitdb.docs(name, dbConfig);
        // Done
        resolve(db);
      } catch (e) {
        reject(e);
      }
    });
  });
};

export default store;
