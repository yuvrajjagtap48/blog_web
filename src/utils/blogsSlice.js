import { createSlice } from "@reduxjs/toolkit";

// Helper function to load blogs from localStorage
const loadBlogsFromStorage = () => {
  try {
    const blogsData = localStorage.getItem('blogBlogs');
    return blogsData ? JSON.parse(blogsData) : [
      {
        id: 1,
        title: "Understanding React Basics",
        author: "Yuvraj",
        content:
          "React is a JavaScript library used for building user interfaces. It is component-based and efficient. React allows developers to create reusable UI components and manage the state of their applications effectively. One of the key features of React is its virtual DOM, which optimizes rendering performance by minimizing direct manipulations of the actual DOM. Developers can build complex user interfaces by composing simple components together. React also supports server-side rendering, which can improve the performance and SEO of web applications. Learning React involves understanding concepts like JSX, components, props, state, and lifecycle methods. With the introduction of hooks in React 16.8, functional components can now manage state and side effects, making the code more concise and easier to test. React's ecosystem includes tools like React Router for navigation, Redux for state management, and various UI libraries for styling. Overall, React has become one of the most popular front-end libraries due to its flexibility and performance.",
        likes: 12,
        comments: 2,
        date: "10 Feb 2026",
        photoUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400",
        createdDate: "10 Feb 2026",
        lastModify: "10 Feb 2026",
      },
      {
        id: 2,
        title: "Django REST Framework Guide",
        author: "Rahul",
        content:
          "Django REST Framework helps build secure and scalable APIs quickly using Python. It is built on top of Django and provides a powerful toolkit for building Web APIs. DRF includes features like serialization, authentication, permissions, and throttling. Developers can quickly create RESTful APIs by defining serializers and viewsets. DRF supports various authentication methods, including token-based authentication and OAuth. It also provides built-in support for pagination, filtering, and searching. One of the strengths of DRF is its browsable API interface, which allows developers to interact with the API directly from the browser. DRF integrates well with Django's ORM, making it easy to create APIs for database models. It also supports custom permissions and throttling to control access to API endpoints. Learning DRF involves understanding concepts like serializers, viewsets, routers, and authentication. With DRF, developers can build robust and scalable APIs with minimal code. It's widely used in the Django community for building backend services.",
        likes: 8,
        comments: 1,
        date: "9 Feb 2026",
        photoUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400",
        createdDate: "9 Feb 2026",
        lastModify: "9 Feb 2026",
      },
      {
        id: 3,
        title: "Full Stack Development Journey",
        author: "Admin",
        content:
          "Full stack development means working on frontend and backend technologies together. A full-stack developer is proficient in both client-side and server-side development. On the frontend, they work with HTML, CSS, and JavaScript frameworks like React or Vue.js. On the backend, they handle server logic, databases, and APIs using technologies like Node.js, Python, or Ruby. Full-stack developers need to understand the entire web development stack, from user interface design to database management. They are responsible for creating seamless user experiences by integrating frontend and backend components. Learning full-stack development requires knowledge of multiple programming languages, frameworks, and tools. Developers often start with one side (frontend or backend) and gradually expand their skills. Full-stack development offers flexibility and the ability to work on diverse projects. It also requires staying updated with the latest technologies and best practices. Many companies value full-stack developers for their versatility and ability to handle end-to-end development.",
        likes: 20,
        comments: 2,
        date: "8 Feb 2026",
        photoUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400",
        createdDate: "8 Feb 2026",
        lastModify: "8 Feb 2026",
      },
      {
        id: 4,
        title: "Introduction to Node.js",
        author: "Priya",
        content:
          "Node.js allows you to run JavaScript on the server-side, enabling full-stack JavaScript development. It is built on Chrome's V8 JavaScript engine and provides an event-driven, non-blocking I/O model. Node.js is lightweight and efficient, making it suitable for building scalable network applications. Developers can use JavaScript for both frontend and backend, reducing context switching. Node.js has a rich ecosystem of packages available through npm (Node Package Manager). It supports building web servers, APIs, real-time applications, and command-line tools. One of the key features of Node.js is its asynchronous nature, which allows handling multiple connections simultaneously. Learning Node.js involves understanding concepts like modules, events, streams, and the event loop. It pairs well with frameworks like Express.js for building web applications. Node.js has gained popularity for building microservices, APIs, and real-time applications like chat apps or collaborative tools.",
        likes: 15,
        comments: 1,
        date: "7 Feb 2026",
        photoUrl: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400",
        createdDate: "7 Feb 2026",
        lastModify: "7 Feb 2026",
      },
      {
        id: 5,
        title: "CSS Grid vs Flexbox",
        author: "Alex",
        content:
          "Learn the differences between CSS Grid and Flexbox for modern web layouts. Both are powerful layout systems in CSS, but they serve different purposes. Flexbox is designed for one-dimensional layouts, either in a row or column. It's great for aligning items within a container and distributing space. CSS Grid is for two-dimensional layouts, allowing control over both rows and columns simultaneously. Grid is ideal for complex layouts like magazine-style designs or application dashboards. Flexbox is better for simpler, linear arrangements. When choosing between them, consider the layout requirements. For navigation bars or card lists, Flexbox might be sufficient. For entire page layouts, Grid provides more control. Many modern websites use a combination of both. Learning both systems gives developers flexibility in creating responsive designs. CSS Grid and Flexbox have excellent browser support in modern browsers. They work well together and can be nested for complex layouts.",
        likes: 10,
        comments: 0,
        date: "6 Feb 2026",
        photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
        createdDate: "6 Feb 2026",
        lastModify: "6 Feb 2026",
      },
      {
        id: 6,
        title: "Machine Learning Basics",
        author: "Sam",
        content:
          "An overview of machine learning concepts and algorithms for beginners. Machine learning is a subset of artificial intelligence that enables computers to learn from data without being explicitly programmed. It involves training algorithms on datasets to make predictions or decisions. There are three main types: supervised learning (learning from labeled data), unsupervised learning (finding patterns in unlabeled data), and reinforcement learning (learning through trial and error). Common algorithms include linear regression, decision trees, neural networks, and clustering methods. Machine learning requires understanding statistics, linear algebra, and programming. Python is the most popular language for ML, with libraries like scikit-learn, TensorFlow, and PyTorch. Applications include image recognition, natural language processing, recommendation systems, and predictive analytics. Getting started involves learning the basics of Python, data preprocessing, model training, and evaluation. Machine learning has become essential in many industries, from healthcare to finance to entertainment.",
        likes: 25,
        comments: 2,
        date: "5 Feb 2026",
        photoUrl: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400",
        createdDate: "5 Feb 2026",
        lastModify: "5 Feb 2026",
      },
    ];
  } catch (error) {
    console.error('Error loading blogs from localStorage:', error);
    return [];
  }
};

// Helper function to save blogs to localStorage
const saveBlogsToStorage = (blogs) => {
  try {
    localStorage.setItem('blogBlogs', JSON.stringify(blogs));
  } catch (error) {
    console.error('Error saving blogs to localStorage:', error);
  }
};

const blogsSlice = createSlice({
  name: "blogs",
  initialState: loadBlogsFromStorage(),
  reducers: {
    addBlog: (state, action) => {
      const newBlog = {
        id: state.length > 0 ? Math.max(...state.map(blog => blog.id)) + 1 : 1,
        ...action.payload,
      };
      state.push(newBlog);
      saveBlogsToStorage(state);
    },
    likeBlog: (state, action) => {
      const { blogId, userId } = action.payload;
      const blog = state.find((blog) => blog.id === blogId);
      if (blog && userId) {
        blog.likes += 1;
        saveBlogsToStorage(state);
      }
    },
    updateCommentCount: (state, action) => {
      const { blogId, increment } = action.payload;
      const blog = state.find((blog) => blog.id === blogId);
      if (blog) {
        blog.comments += increment;
        saveBlogsToStorage(state);
      }
    },
    deleteBlog: (state, action) => {
      const { blogId } = action.payload;
      const index = state.findIndex((blog) => blog.id === blogId);
      if (index !== -1) {
        state.splice(index, 1);
        saveBlogsToStorage(state);
      }
    },
  },
});

export const { addBlog, likeBlog, updateCommentCount, deleteBlog } = blogsSlice.actions;

export default blogsSlice.reducer;