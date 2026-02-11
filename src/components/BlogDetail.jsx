import { useParams } from "react-router-dom";
import { useState } from "react";

export default function BlogDetail() {
  const { id } = useParams();
  const [blogs] = useState([
    {
      id: 1,
      title: "Understanding React Basics",
      author: "Yuvraj",
      content:
        "React is a JavaScript library used for building user interfaces. It is component-based and efficient. React allows developers to create reusable UI components and manage the state of their applications effectively. One of the key features of React is its virtual DOM, which optimizes rendering performance by minimizing direct manipulations of the actual DOM. Developers can build complex user interfaces by composing simple components together. React also supports server-side rendering, which can improve the performance and SEO of web applications. Learning React involves understanding concepts like JSX, components, props, state, and lifecycle methods. With the introduction of hooks in React 16.8, functional components can now manage state and side effects, making the code more concise and easier to test. React's ecosystem includes tools like React Router for navigation, Redux for state management, and various UI libraries for styling. Overall, React has become one of the most popular front-end libraries due to its flexibility and performance.",
      likes: 12,
      comments: [
        { author: "Alice", text: "Great article!", date: "11 Feb 2026" },
        { author: "Bob", text: "Very helpful.", date: "10 Feb 2026" },
      ],
      date: "10 Feb 2026",
    },
    {
      id: 2,
      title: "Django REST Framework Guide",
      author: "Rahul",
      content:
        "Django REST Framework helps build secure and scalable APIs quickly using Python. It is built on top of Django and provides a powerful toolkit for building Web APIs. DRF includes features like serialization, authentication, permissions, and throttling. Developers can quickly create RESTful APIs by defining serializers and viewsets. DRF supports various authentication methods, including token-based authentication and OAuth. It also provides built-in support for pagination, filtering, and searching. One of the strengths of DRF is its browsable API interface, which allows developers to interact with the API directly from the browser. DRF integrates well with Django's ORM, making it easy to create APIs for database models. It also supports custom permissions and throttling to control access to API endpoints. Learning DRF involves understanding concepts like serializers, viewsets, routers, and authentication. With DRF, developers can build robust and scalable APIs with minimal code. It's widely used in the Django community for building backend services.",
      likes: 8,
      comments: [
        { author: "Charlie", text: "Thanks for the guide!", date: "09 Feb 2026" },
      ],
      date: "09 Feb 2026",
    },
    {
      id: 3,
      title: "Full Stack Development Journey",
      author: "Admin",
      content:
        "Full stack development means working on frontend and backend technologies together. A full-stack developer is proficient in both client-side and server-side development. On the frontend, they work with HTML, CSS, and JavaScript frameworks like React or Vue.js. On the backend, they handle server logic, databases, and APIs using technologies like Node.js, Python, or Ruby. Full-stack developers need to understand the entire web development stack, from user interface design to database management. They are responsible for creating seamless user experiences by integrating frontend and backend components. Learning full-stack development requires knowledge of multiple programming languages, frameworks, and tools. Developers often start with one side (frontend or backend) and gradually expand their skills. Full-stack development offers flexibility and the ability to work on diverse projects. It also requires staying updated with the latest technologies and best practices. Many companies value full-stack developers for their versatility and ability to handle end-to-end development.",
      likes: 20,
      comments: [
        { author: "Diana", text: "Inspiring journey!", date: "08 Feb 2026" },
        { author: "Eve", text: "Great insights.", date: "07 Feb 2026" },
      ],
      date: "08 Feb 2026",
    },
    {
      id: 4,
      title: "Introduction to Node.js",
      author: "Priya",
      content:
        "Node.js allows you to run JavaScript on the server-side, enabling full-stack JavaScript development. It is built on Chrome's V8 JavaScript engine and provides an event-driven, non-blocking I/O model. Node.js is lightweight and efficient, making it suitable for building scalable network applications. Developers can use JavaScript for both frontend and backend, reducing context switching. Node.js has a rich ecosystem of packages available through npm (Node Package Manager). It supports building web servers, APIs, real-time applications, and command-line tools. One of the key features of Node.js is its asynchronous nature, which allows handling multiple connections simultaneously. Learning Node.js involves understanding concepts like modules, events, streams, and the event loop. It pairs well with frameworks like Express.js for building web applications. Node.js has gained popularity for building microservices, APIs, and real-time applications like chat apps or collaborative tools.",
      likes: 15,
      comments: [
        { author: "Frank", text: "Node.js is awesome!", date: "07 Feb 2026" },
      ],
      date: "07 Feb 2026",
    },
    {
      id: 5,
      title: "CSS Grid vs Flexbox",
      author: "Alex",
      content:
        "Learn the differences between CSS Grid and Flexbox for modern web layouts. Both are powerful layout systems in CSS, but they serve different purposes. Flexbox is designed for one-dimensional layouts, either in a row or column. It's great for aligning items within a container and distributing space. CSS Grid is for two-dimensional layouts, allowing control over both rows and columns simultaneously. Grid is ideal for complex layouts like magazine-style designs or application dashboards. Flexbox is better for simpler, linear arrangements. When choosing between them, consider the layout requirements. For navigation bars or card lists, Flexbox might be sufficient. For entire page layouts, Grid provides more control. Many modern websites use a combination of both. Learning both systems gives developers flexibility in creating responsive designs. CSS Grid and Flexbox have excellent browser support in modern browsers. They work well together and can be nested for complex layouts.",
      likes: 10,
      comments: [],
      date: "06 Feb 2026",
    },
    {
      id: 6,
      title: "Machine Learning Basics",
      author: "Sam",
      content:
        "An overview of machine learning concepts and algorithms for beginners. Machine learning is a subset of artificial intelligence that enables computers to learn from data without being explicitly programmed. It involves training algorithms on datasets to make predictions or decisions. There are three main types: supervised learning (learning from labeled data), unsupervised learning (finding patterns in unlabeled data), and reinforcement learning (learning through trial and error). Common algorithms include linear regression, decision trees, neural networks, and clustering methods. Machine learning requires understanding statistics, linear algebra, and programming. Python is the most popular language for ML, with libraries like scikit-learn, TensorFlow, and PyTorch. Applications include image recognition, natural language processing, recommendation systems, and predictive analytics. Getting started involves learning the basics of Python, data preprocessing, model training, and evaluation. Machine learning has become essential in many industries, from healthcare to finance to entertainment.",
      likes: 25,
      comments: [
        { author: "Grace", text: "Fascinating topic!", date: "05 Feb 2026" },
        { author: "Henry", text: "Well explained.", date: "04 Feb 2026" },
      ],
      date: "05 Feb 2026",
    },
  ]);

  const blog = blogs.find((b) => b.id === parseInt(id));

  if (!blog) {
    return <div className="min-h-screen bg-gray-100 py-10 px-4 text-center">Blog not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{blog.title}</h1>
        <p className="text-lg text-gray-600 mb-6">{blog.content}</p>
        <p className="text-sm text-gray-500 mb-6">
          By <span className="font-medium">{blog.author}</span> • {blog.date}
        </p>
        <div className="flex items-center gap-6 mb-8">
          <span className="text-red-500">❤️ {blog.likes} Likes</span>
          <span className="text-blue-500">💬 {blog.comments.length} Comments</span>
        </div>
        <div className="border-t pt-6">
          <h2 className="text-2xl font-semibold mb-4">Comments</h2>
          {blog.comments.length > 0 ? (
            blog.comments.map((comment, index) => (
              <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg">
                <p className="font-medium">{comment.author}</p>
                <p className="text-gray-700">{comment.text}</p>
                <p className="text-sm text-gray-500">{comment.date}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No comments yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}