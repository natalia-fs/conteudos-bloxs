import { api } from "./api";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
// import ReactHtmlParser from 'react-html-parser';

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
    <div className={styles.homepage}>

      <h1>Bloxs News</h1>
      <section className={styles.postsContainer}>

        {energyPosts.map((post: Post) => {
          return (
            <a href={'#'} target="_blank" key={post.id} className={styles.postContainer}>
              
              <img src={post.yoast_head_json.og_image[0].url} className={styles.postImage}/>
              <h3 className={styles.postTitle}> {post.title.rendered} </h3>
              <span className={styles.postDate}>
                {
                  new Date(post.date)
                    .toLocaleString('pt-BR', {dateStyle: 'short', timeStyle: 'short'})
                }
              </span>
              <p className={styles.postDescription}>
                {post.yoast_head_json.description}
              </p>

            </a>
          );
        })}

        {agrobusinessPosts.map((post: Post) => {
          return (
            <a href={'#'} target="_blank" key={post.id} className={styles.postContainer}>
              
              <img src={post.yoast_head_json.og_image[0].url} className={styles.postImage}/>
              <h3 className={styles.postTitle}> {post.title.rendered} </h3>
              <span className={styles.postDate}>
                {
                  new Date(post.date)
                    .toLocaleString('pt-BR', {dateStyle: 'short', timeStyle: 'short'})
                }
              </span>
              <p className={styles.postDescription}>
                {post.yoast_head_json.description}
              </p>

            </a>
          );
        })}

      </section>
    </div>
  );
}