import Link from "next/link";

function Evidence({ evidence }) {
  return (
    <>
      <Link href="/">
        <a>Zpět</a>
      </Link>
      <h1>{evidence.properties.evidenceName}</h1>
      <table>
        <tbody>
          {evidence.properties.property.map((property) => (
            <tr key={property.propertyName}>
              <td>{property.title}</td>
              <td>{property.type}</td>
              <td>{property.maxLength}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export async function getStaticPaths() {
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

  const paths = evidences.evidences.evidence.map((evidence) => ({
    params: { id: evidence.evidencePath },
  }));

  //console.log(paths);

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1

  const res = await fetch(
    process.env.FLEXIENDPOINT + params.id + "/properties",
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "Basic " +
          Buffer.from(
            process.env.FLEXIUSER + ":" + process.env.FLEXIPASS,
            "binary"
          ).toString("base64"),
      },
    }
  );
  const evidence = await res.json();
  // Pass post data to the page via props
  return { props: { evidence } };
}

export default Evidence;
