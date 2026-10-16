import { NextResponse } from 'next/server';

const menuItems = [
  {
    id: 'doro-wat',
    name: 'Doro Wat',
    description: 'Traditional spicy chicken stew served with hard-boiled eggs and injera.',
    price: 450,
    image: '/images/menu/doro-wat.jpg',
  },
  {
    id: 'tibs',
    name: 'Special Tibs',
    description: 'Sautéed cubed beef or lamb cooked with onions, garlic, and rosemary.',
    price: 500,
    image: '/images/menu/tibs.jpg',
  },
  {
    id: 'kitfo',
    name: 'Special Kitfo',
    description: 'Minced lean beef warmed in spiced clarified butter and mitmita.',
    price: 550,
    image: '/images/menu/kitfo.jpg',
  },
  {
    id: 'shiro',
    name: 'Shiro Tegabeno',
    description: 'Rich, bubbling chickpea puree simmered with traditional spices.',
    price: 250,
    image: '/images/menu/shiro.jpg',
  },
  {
    id: 'beyaynetu',
    name: 'Yetsom Beyaynetu',
    description: 'Colorful platter of lentils, split peas, collard greens, and vegetable stews.',
    price: 300,
    image: '/images/menu/beyaynetu.jpg',
  },
  {
    id: 'gomen-besiga',
    name: 'Gomen Be Siga',
    description: 'Tender beef cubes slow-cooked with fresh collard greens and seasoned butter.',
    price: 420,
    image: '/images/menu/gomen-besiga.jpg',
  },
];

export async function GET() {
  return NextResponse.json(menuItems);
}