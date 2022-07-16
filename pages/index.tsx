import { api } from "./api";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { Post } from "../src/components/Post";
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';

export interface Post {
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
  yoast_head_json: YoastHeadJson;
};

type YoastHeadJson = {
  description: string;
  og_site_name: string;
  og_image: Array<{
    url: string;
    type: string;
  }>
}

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
    <main className={styles.homePage}>

      <h1>Bloxs News</h1>
      <section className={styles.postsContainer}>

        <h2>Energia</h2>
        <div className={styles.energyPosts}>
          {energyPosts.map((post: Post) => {
            return (
              <Post key={post.id} post={post} />
            );
          })}
        </div>

        <h2>Agronegócio</h2>
        <div className={styles.agrobusinessPosts}>
          {agrobusinessPosts.map((post: Post) => {
            return (
              <Post key={post.id} post={post} />
            );
          })}
        </div>

      </section>
    </main>
  );
}