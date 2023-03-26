import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";
import utilStyles from "../styles/utils.module.css";

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <p className={utilStyles.intro}>
        Hi, I'm <b>Monica</b>. I am a software engineer with expertise in
        building web and mobile apps using React and React Native. You can
        contact me on{" "}
        <Link href="https://www.linkedin.com/in/monica-acha-2103/">
          Linkedin
        </Link>
        .
      </p>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
