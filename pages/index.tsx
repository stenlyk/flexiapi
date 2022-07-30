import type { NextPage } from "next";
import Link from "next/link";
import styles from "../styles/Home.module.css";

function Home({ evidences }) {
  return evidences.evidences.evidence.map((evidence) => {
    return (
      <div key={evidence.evidencePath}>
        <Link href={"/evidence/" + evidence.evidencePath}>
          <a>{evidence.evidenceName}</a>
        </Link>
      </div>
    );
  });
}

export async function getStaticProps() {
  // Call an external API endpoint to get posts
  const user = process.env.FLEXIUSER;
  const pass = process.env.FLEXIPASS;

  const res = await fetch(process.env.FLEXIENDPOINT + "evidence-list", {
    method: "GET",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      authorization:
        "Basic " + Buffer.from(user + ":" + pass, "binary").toString("base64"),
    },
  });
  const evidences = await res.json();
  // Get the paths we want to pre-render based on posts
  return {
    props: { evidences },
  };
}

export default Home;
