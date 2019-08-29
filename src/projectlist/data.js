import uuid from 'uuid/v1';
import product_1 from '../assets/images/logo.png'
import product_2 from '../assets/images/products/product_2.png'
import product_3 from '../assets/images/products/product_3.png'
import product_4 from '../assets/images/products/product_4.png'
import product_5 from '../assets/images/products/product_5.png'
import product_6 from '../assets/images/products/product_6.png'

export default [
  {
    id: uuid(),
    title: 'asBUILT',
    description:
      'asBUILT is one of the largest and most experienced independent, specialist BIM consultancies in Australasia.',
    imageUrl: product_1,
    totalDownloads: '999',
    updatedAt: '03/09/2019',
    link:'/floorplan',
  },
  {
    id: uuid(),
    title: 'Medium Corporation',
    description:
      'Medium is an online publishing platform developed by Evan Williams, and launched in August 2012.',
    imageUrl: product_2,
    totalDownloads: '625',
    createdAt: '31/08/2019',
    link:'#',
  },
  {
    id: uuid(),
    title: 'Slack',
    description:
      'Slack is a cloud-based set of team collaboration tools and services, founded by Stewart Butterfield.',
    imageUrl: product_3,
    totalDownloads: '857',
    createdAt: '03/08/2019',
    link:'#',
  },
  {
    id: uuid(),
    title: 'Lyft',
    description:
      'Lyft is an on-demand transportation company based in San Francisco, California.',
    imageUrl: product_4,
    totalDownloads: '406',
    createdAt: '04/08/2019',
    link:'#',
  },
  {
    id: uuid(),
    title: 'GitHub',
    description:
      'GitHub is a popular web-based hosting service for version control of code using Git.',
    imageUrl: product_5,
    totalDownloads: '835',
    createdAt: '04/08/2019',
    link:'#',
  },
  {
    id: uuid(),
    title: 'Squarespace',
    description:'Squarespace provides software as a service for website building and hosting.',
    imageUrl: product_6,
    totalDownloads: '835',
    createdAt: '04/08/2019',
    link:'#',
  }
];
