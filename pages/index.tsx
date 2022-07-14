import { GetStaticProps } from "next";
import { api } from "./api";
import styles from "../styles/Home.module.css";

type Post = {
  id: number;
  date: string;
  modified: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  }
  author: number;
  categories: Array<number>;
  tags: Array<number>;
};

type HomeProps = {
  energyPosts: Post[];
  agrobusinessPosts: Post[];
};

export default function Home({ energyPosts, agrobusinessPosts }: HomeProps) {

  return (
    <div className={styles.homepage}>

      <section className={styles.allEpisodes}>
        <h2>Bloxs News</h2>

        {energyPosts.map((post) => {
          return (
            <div key={post.id}>
              {post.title.rendered}
            </div>
          );
        })}
        <hr />
        {agrobusinessPosts.map((post) => {
          return (
            <div key={post.id}>
              {post.title.rendered}
            </div>
          );
        })}

      </section>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const energyPosts = await api.get("posts", {
    params: {
      per_page: 3,
      page: 1,
      _embed: 1,
      categories: 74
    },
  }).then(response => response.data);
  const agrobusinessPosts = await api.get("posts", {
    params: {
      per_page: 3,
      page: 1,
      _embed: 1,
      categories: 76
    },
  }).then(response => response.data);

  const energyPostsData = energyPosts.map((post: Post) => {
    return {
      id: post.id,
      date: post.date,
      modified: post.modified,
      slug: post.slug,
      status: post.status,
      type: post.type,
      link: post.link,
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      author: post.author,
      categories: post.categories,
      tags: post.tags
    };
  });
  const agrobusinessPostsData = agrobusinessPosts.map((post: Post) => {
    return {
      id: post.id,
      date: post.date,
      modified: post.modified,
      slug: post.slug,
      status: post.status,
      type: post.type,
      link: post.link,
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      author: post.author,
      categories: post.categories,
      tags: post.tags
    };
  });

  return {
    props: {
      energyPosts: energyPostsData,
      agrobusinessPosts: agrobusinessPostsData
    },
    revalidate: 60 * 60 * 3, //seconds
  };
};
