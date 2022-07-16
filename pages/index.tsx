import { api } from "./api";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";

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

const PER_PAGE = 3;

export default function Home() {
  const [energyPosts, setEnergyPosts] = useState<Array<Post>>([]);
  const [agrobusinessPosts, setAgrobusinessPosts] = useState<Array<Post>>([]);

  useEffect( () => {
    api.get("posts", { params: {
      per_page: PER_PAGE,
      page: 1,
      _embed: 1,
      categories: 74
    }}).then(response => setEnergyPosts(response.data));
    api.get("posts", { params: {
      per_page: PER_PAGE,
      page: 1,
      _embed: 1,
      categories: 76
    }}).then(response => setAgrobusinessPosts(response.data));
  }, []);

  return (
    <div className={styles.homepage}>

      <h2>Bloxs News</h2>
      <section className={styles.postsContainer}>

        {energyPosts.map((post: Post) => {
          return (
            <div key={post.id} className={styles.postContainer}>
              {post.title.rendered}
            </div>
          );
        })}
        <hr />
        {agrobusinessPosts.map((post: Post) => {
          return (
            <div key={post.id} className={styles.postContainer}>
              {post.title.rendered}
            </div>
          );
        })}

      </section>
    </div>
  );
}