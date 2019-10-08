import Head from 'next/head';
import Layout from '../components/Layout/Layout';
import Hero from '../components/Hero/Hero';
import fetch from 'isomorphic-unfetch';
import siteConfig from '../components/Global/Global';
import Banner from '../components/Banner/Banner';

const Home = props => (
    <>
        <Head>
            <title>
                {siteConfig.title} - {siteConfig.description}
            </title>
        </Head>
        <Layout data={props.menu}>
            <Hero data={props.posts} />
            <Banner data={props.banner} />
        </Layout>
    </>
);

Home.getInitialProps = async function() {
    // Posts
    const resPosts = await fetch(`${siteConfig.endpoints.posts}?categories=${siteConfig.highlights.id}`);
    const jsonPosts = await resPosts.json();

    // Menus
    const resMenu = await fetch(siteConfig.endpoints.menu);
    const jsonMenu = await resMenu.json();

    // Banner
    const resBanner = await fetch(siteConfig.endpoints.banner);
    const jsonBanner = await resBanner.json();

    return {
        menu: jsonMenu,
        posts: jsonPosts,
        banner: jsonBanner
    };
};

export default Home;
