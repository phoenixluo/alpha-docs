import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

type Product = {
  title: string;
  description: string;
  to?: string;
  status: '可用' | '敬请期待';
};

const PRODUCTS: Product[] = [
  {
    title: 'TMS 运输管理',
    description: '运单、地址解析、整车装载规划、报价下单、轨迹跟踪与事件推送。',
    to: '/tms',
    status: '可用',
  },
  {
    title: 'WMS 仓储管理',
    description: '入库、库存、拣货与出库作业。',
    status: '敬请期待',
  },
  {
    title: 'Voice 语音',
    description: '语音交互与通话处理能力。',
    status: '敬请期待',
  },
];

function ProductCard({ title, description, to, status }: Product) {
  const body = (
    <div className={clsx('card', styles.productCard)}>
      <div className="card__header">
        <Heading as="h3">{title}</Heading>
        <span
          className={clsx(
            'badge',
            status === '可用' ? 'badge--success' : 'badge--secondary',
          )}
        >
          {status}
        </span>
      </div>
      <div className="card__body">
        <p>{description}</p>
      </div>
    </div>
  );

  return to ? (
    <Link to={to} className={styles.productLink}>
      {body}
    </Link>
  ) : (
    <div className={styles.productLink}>{body}</div>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title="开发者文档"
      description="Alpha Cargo 开发者文档 —— TMS 接口接入指南"
    >
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <Heading as="h1" className="hero__title">
            {siteConfig.title}
          </Heading>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link className="button button--secondary button--lg" to="/tms">
              开始接入 TMS
            </Link>
          </div>
        </div>
      </header>
      <main className="container margin-vert--lg">
        <div className="row">
          {PRODUCTS.map((product) => (
            <div key={product.title} className="col col--4 margin-bottom--lg">
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </main>
    </Layout>
  );
}
