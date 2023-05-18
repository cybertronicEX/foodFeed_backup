import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as IoIcons5 from 'react-icons/io5';

export const SidebarData =[
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Search',
        path: '/search',
        icon: <IoIcons5.IoSearch />,
        cName: 'nav-text'
    }, 
    {
        title: 'aboutus',
        path: '/aboutus',
        icon: <FaIcons.FaInfoCircle />,
        cName: 'nav-text'
    },

    {   title: 'AddProfile',
        path: '/AddProfile',
        icon: <IoIcons.IoIosAddCircle />,
        cName: 'nav-text'
    },

    {   title: 'Login',
    path: '/login',
    icon: <IoIcons5.IoLogInSharp />,
    cName: 'nav-text'
},
]