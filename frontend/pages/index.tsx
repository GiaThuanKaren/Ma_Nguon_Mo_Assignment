import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { PostItem, WrapperList } from "src/components";
import Mainlayout from "src/Layouts/Mainlayout";
import styles from "../styles/Home.module.css";
import React from "react";
import { GetAllPost } from "src/service/api";
import { PostItemInf } from "src/Model";
export default function Home() {
  const router = useRouter();
  console.log(router.asPath);
  const [properties, setProperties] = React.useState<PostItemInf[]>([]);
  console.log(properties);
  const TabsHome = [
    {
      title: "Relevant",
      href: "",
    },
    {
      title: "Latest",
      href: "/latest",
    },
  ];
  React.useEffect(() => {
    async function FetchApi() {
      try {
        let result = await GetAllPost();
        console.log(result)
        setProperties(result.articles)
      } catch (error) {

      }
    }
    FetchApi();
  }, [])
  return (
    <>
      <Mainlayout>
        <WrapperList>
          <div className="flex items-center mb-3">
            {TabsHome.map((item: any, index: number) => {
              return (
                <>
                  <Link className="block mr-7" href={item.href}>
                    <p className={``}>{item.title}</p>
                  </Link>
                </>
              );
            })}
          </div>
          {properties.map((item: PostItemInf, index: number) => {
            return (
              <>
                <PostItem  optionAdmin={false}    {...item} />
              </>
            );
          })}
        </WrapperList>
      </Mainlayout>
    </>
  );
}
