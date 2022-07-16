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
  const [page, setPage] = useState(1);
  const [energyPosts, setEnergyPosts] = useState<Array<Post>>([]);
  const [agrobusinessPosts, setAgrobusinessPosts] = useState<Array<Post>>([]);

  async function fetchPostData(
    categories: number,
    page: number,
    per_page: number,
    // state: Array<Post>,
    // update: Dispatch<SetStateAction<Post[]>>
  ){
    await api.get("posts", { params: {
      page, per_page, _embed: 1, categories
    }}).then(response => {
      // TODO: Refatorar/continuar o resgate de novos posts
      // update([...state, response.data]);
      console.log(response.data);
    })
  }

  useEffect( () => {
    api.get("posts", { params: {
      per_page: PER_PAGE,
      page,
      _embed: 1,
      categories: 74
    }}).then(response => setEnergyPosts(response.data));
    api.get("posts", { params: {
      per_page: PER_PAGE,
      page,
      _embed: 1,
      categories: 76
    }}).then(response => setAgrobusinessPosts(response.data));
  }, []);

  return (
    <main className={styles.homePage}>

      <section className={styles.postsContainer}>
        
        <h1  className={styles.title}>CONTEÚDO BLOXS</h1>

        <h2 className={styles.header}>Energia</h2>
        <div className={styles.energyPosts}>
          {/* TODO: Componentizar o carousel */}
          <Carousel
            additionalTransfrom={0}
            arrows
            infinite
            centerMode={false}
            containerClass="container"
            draggable
            focusOnSelect={false}
            keyBoardControl
            minimumTouchDrag={80}
            pauseOnHover
            renderArrowsWhenDisabled={false}
            renderButtonGroupOutside={false}
            renderDotsOutside
            responsive={{
              desktop: {
                breakpoint: {
                  max: 3000,
                  min: 1024
                },
                items: 1
              },
              mobile: {
                breakpoint: {
                  max: 464,
                  min: 0
                },
                items: 1
              },
              tablet: {
                breakpoint: {
                  max: 1024,
                  min: 464
                },
                items: 1
              }
            }}
            rewind={false}
            slidesToSlide={1}
            swipeable
            beforeChange={ (nextSlide, { currentSlide }) => {
              if(nextSlide == energyPosts.length-1){
                fetchPostData(74, page+1, PER_PAGE);
                // fetchPostData(74, page+1, PER_PAGE, energyPosts, setEnergyPosts);
                setPage(page+1);
              }
            }}
          >
            {energyPosts.map((post: Post, index) => {
              return (
                <Post key={index} post={post} />
              );
            })}
          </Carousel>
        </div>

        <h2 className={styles.header}>Agronegócio</h2>
        <div className={styles.agrobusinessPosts}>
          <Carousel
            additionalTransfrom={0}
            arrows
            infinite
            centerMode={false}
            containerClass="container"
            draggable
            focusOnSelect={false}
            keyBoardControl
            minimumTouchDrag={80}
            pauseOnHover
            renderArrowsWhenDisabled={false}
            renderButtonGroupOutside={false}
            renderDotsOutside
            responsive={{
              desktop: {
                breakpoint: {
                  max: 3000,
                  min: 1024
                },
                items: 1
              },
              mobile: {
                breakpoint: {
                  max: 464,
                  min: 0
                },
                items: 1
              },
              tablet: {
                breakpoint: {
                  max: 1024,
                  min: 464
                },
                items: 1
              }
            }}
            rewind={false}
            slidesToSlide={1}
            swipeable
            beforeChange={ (nextSlide) => {
              if(nextSlide == energyPosts.length-1){
                fetchPostData(76, page+1, PER_PAGE);
                // fetchPostData(76, page+1, PER_PAGE, energyPosts, setEnergyPosts);
                setPage(page+1);
              }
            }}
          >
            {agrobusinessPosts.map((post: Post, index) => {
              return (
                <Post key={index} post={post} />
              );
            })}
          </Carousel>
        </div>

      </section>
    </main>
  );
}