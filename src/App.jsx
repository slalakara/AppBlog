import { createContext, useContext, useEffect, useState } from 'react';
import './App.css';
import img from './img/img.png';

const RouterContext = createContext(null);

const routes = [
  {
    id: crypto.randomUUID(),
    name: 'Home',
    url: '#/',
    element: <Home />,
  },
  {
    id: crypto.randomUUID(),
    name: 'About',
    url: '#/about',
    element: <About />,
  },
  {
    id: crypto.randomUUID(),
    name: 'Posts',
    url: '#/posts',
    element: <Posts />,
  },
  {
    id: crypto.randomUUID(),
    name: 'Contact',
    url: '#/contact',
    element: <Contact />,
  },
];

const notFound = {
  name: 'Page not found',
  element: <NotFound />,
  url: '',
};

function getRoute(routeUrl) {
  const route = routes.find(x => x.url === routeUrl);
  return route ?? notFound;
}

const title = "App";

function setTitle(pageTitle) {
  document.title = `${pageTitle} - ${title}`;
}

function App() {
  const [route, setRoute] = useState(
    () => {
      if(location.hash.length < 2) {
        return routes[0];
      }

      return getRoute(location.hash);
    }
  );
  const [darkMode, setDarkMode] = useState(() => 
    localStorage.getItem('darkMode') === 'true'
  );

  useEffect(() => {
    setTitle(route.name);
  }, [route]);

  useEffect(() => {
    window.addEventListener('hashchange', function() {
      setRoute(getRoute(location.hash));
    });
  }, []);

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : 'light-mode';
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  return (
    <div className={`container ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <RouterContext.Provider value={route}>
        <Header toggleDarkMode={() => setDarkMode(prev => !prev)} />
        <Main />
        <Footer />
      </RouterContext.Provider>
    </div>
  );
}

function Main() {
  return (
    <div className="main">
      <div className="scroll-container">
        <Content />
      </div>
    </div>
  );
}

function Header({ toggleDarkMode }) {
  return (
    <div className="header">
      <a href="#/" className='Logo'>App</a>
      <Nav />
      <label className="switch">
        <input 
          type="checkbox" 
          onChange={toggleDarkMode} 
          defaultChecked={document.body.classList.contains('dark-mode')}
        />
        <span className="slider round"></span>
      </label>
    </div>
  );
}

function Nav() {
  const route = useContext(RouterContext);

  return (
    <ul className="nav">
      {routes.map(x => 
        <li key={x.id}>
          <a href={x.url} className={route.url === x.url ? 'selected': ''}>{x.name}</a>
        </li>)}
    </ul>
  )
}

function Content() {
  const route = useContext(RouterContext);

  return (
    <div className="content">
      <h1>{route.name}</h1>
      {route.element}
    </div>
  )
}

function Footer() {
  return (
    <div className="footer">&copy; 2024</div>
  )
}

function LikeBtn() {
  const [likeCount, setLikeCount] = useState(
    localStorage.likeCount ?
    parseInt(localStorage.likeCount) : 0
  );

  useEffect(() => {
    localStorage.likeCount = likeCount;
  }, [likeCount]);

  function increaseLikeCount() {
    setLikeCount(likeCount + 1);
  }

  return (
    <button className='LikeBtn' onClick={increaseLikeCount}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart" width="30" height="30">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.9 4.5 2.4 1.09-1.5 2.76-2.4 4.5-2.4C19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
   {likeCount}</button>
  )
}

function Home() {
  return (
    <div className="Home">
      <fieldset>
        <legend>
          <h2>Welcome to Our Platform</h2>
        </legend>
        <p>
          At <span style={{textDecoration: 'underline #1C5CFF'}}>App</span>, we’re dedicated to delivering innovative and reliable digital solutions that simplify your life. Whether you're here to explore our services, discover new insights, or connect with our global community, you’re in the right place.
          Our journey began with a vision to solve real-world challenges using cutting-edge technology, and today, we continue to evolve with the same passion and commitment. From the latest in tech innovation to user-friendly experiences, we’re here to bring you closer to the future.
          Explore our services, read our latest updates, and feel free to reach out to our team for any assistance. We're here to make your experience seamless and enjoyable.
          <br />Welcome aboard!
        </p>
      </fieldset>
    </div>
  );
}

function About() {
  return (
    <div className="About">
      <h2>Our Vision</h2>
      <p>We aim to be a pioneer in the digital world by offering innovative solutions and delivering the best experience to our users. By harnessing the power of technology, we strive to expand our reach and impact every day.</p>
      <h2>Our Mission</h2>
      <p>To provide fast, reliable, and cutting-edge services tailored to the needs of our users. Our goal is to grow with a commitment to excellence in every area and to make a difference with our solutions.</p>
      <h2>Our Story</h2>
      <p>In 2022, we started this journey as a small team passionate about technology and driven by a problem-solving mindset. Our purpose was to provide quick and effective solutions to the digital challenges faced by our users. Today, we have grown into a global community, offering our services on a larger scale with the same dedication.</p>
      <h2>Our Values</h2>
      <p>We believe in innovation, integrity, and customer-centricity. Every solution we create is designed with our users in mind, ensuring transparency and excellence in everything we do. Collaboration and constant learning are at the core of our approach, allowing us to continuously evolve and stay ahead of industry trends.</p>
      <h2>Our Team</h2>
      <p>Our team consists of passionate individuals from diverse backgrounds, each bringing unique expertise to the table. With a shared vision of driving progress, we work together to build solutions that are not only functional but also transformative for our users.</p>
      <h2>Looking Ahead</h2>
      <p>As we continue to grow, we remain committed to pushing the boundaries of what's possible. Our focus is on creating meaningful experiences that make a lasting impact. Whether it’s developing new technologies or enhancing existing services, we are always exploring ways to deliver value to our users and partners.</p>
    </div>
  );
}

function Contact() {
  return (
    <div className="contact">
      <div className="ContactInputArea">
        <h2>Get in <span style={{color: '#1C5CFF'}}>touch</span></h2>
        <p>We'd love to hear from you! Whether you have questions, feedback, or just want to say hello, feel free to reach out to us. <br />Our team is here to assist you and will get back to you as soon as possible. <br />Please use the form below or contact us directly via email or phone.</p>
        <input type="text" placeholder='Contact name' />
        <input type="text" placeholder='Street' />
        <div className="CityPost d-flex"><input type="text" placeholder='City' /> <input type="number" placeholder='Postcode' /></div>
        <input type="number" placeholder='Contact Phone' />
        <input type="e-mail" placeholder='E-mail' />
        <input type="text" placeholder='Let’s talk about your idea' />
        <button>Submit</button>
      </div>
      <div className="image"><img src={img} /></div>
    </div>
  );
}

function Posts() {
  const [postId, setPostId] = useState(null);

  return (
    <>
      {postId ? <PostDetail postId={postId} setPostId={setPostId} /> : <PostList setPostId={setPostId} />}
    </>
  )
}

function PostList({ setPostId }) {
  const [posts, setPosts] = useState([]);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(() => {
    const savedPage = localStorage.getItem('currentPage');
    return savedPage ? Number(savedPage) : 1;
  });

  useEffect(() => {
    async function fetchPosts() {
      const skip = (page - 1) * limit;
      const response = await fetch(`https://dummyjson.com/posts?limit=${limit}&skip=${skip}`);
      const data = await response.json();
      setPosts(data.posts);
      setTotal(data.total);
    }
    fetchPosts();
  }, [page, limit]);

  useEffect(() => {
    localStorage.setItem('currentPage', page);
  }, [page]);

  function changePage(pageNumber) {
    setPage(pageNumber);
  }

  function handleLimitChange(e) {
    setLimit(Number(e.target.value));
    setPage(1);
  }

  const pageCount = Math.ceil(total / limit);

  function handlePrevPage(e) {
    e.preventDefault();
    if (page > 1) {
      setPage(page - 1);
    }
  }

  function handleNextPage(e) {
    e.preventDefault();
    if (page < pageCount) {
      setPage(page + 1);
    }
  }

  return (
    <>
      <div>
        <select className="limitSelect" value={limit} onChange={handleLimitChange}>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="25">25</option>
        </select>
      </div>

      <div className="TitlesWrapper">
        {posts.map(x =>
          <a
          key={x.id}
            href={'#/posts/' + x.id}
            onClick={e => { e.preventDefault(); setPostId(x.id); localStorage.setItem('currentPostId', x.id); }}>
            <div className="Titles">
              <h3 key={x.id}>{x.title}</h3>
              <h6>#<span>{x.tags}</span></h6>
            </div>
          </a>
        )}
      </div>

      {pageCount > 0 && (
        <ul className="Pagination">
          <li><a href="#" onClick={handlePrevPage}>&lt;</a></li>
          {Array.from({ length: pageCount }, (v, i) => i + 1).map(x => (
            <li key={x}>
              <a href="#" className={page === x ? 'activePage' : ''} onClick={e => { e.preventDefault(); changePage(x); }}>
                {x}
              </a>
            </li>
          ))}
          <li><a href="#" onClick={handleNextPage}>&gt;</a></li>
        </ul>
      )}
    </>
  );
}

function PostDetail({ postId, setPostId }) {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState(() => {
    const savedComments = localStorage.getItem(`comments-${postId}`);
    return savedComments ? JSON.parse(savedComments) : [];
  });
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 5;

  async function getData() {
    const postData = await fetch(`https://dummyjson.com/posts/${postId}`).then(r => r.json());
    setPost(postData);

    const commentsData = await fetch(`https://dummyjson.com/posts/${postId}/comments`).then(r => r.json());
    const paginatedComments = commentsData.comments.slice((currentPage - 1) * commentsPerPage, currentPage * commentsPerPage);
    setComments(paginatedComments);
  }

  useEffect(() => {
    getData();
  }, [postId, currentPage]);

  useEffect(() => {
    localStorage.setItem(`comments-${postId}`, JSON.stringify(comments));
  }, [comments, postId]);

  function handleBackClick(e) {
    e.preventDefault();
    setPostId(null);
  }

  function handleCommentSubmit(e) {
    e.preventDefault();
    if (newComment) {
      const newCommentObj = {
        id: crypto.randomUUID(),
        body: newComment,
        user: { fullName: 'You' }
      };
      setComments(prevComments => [...prevComments, newCommentObj]);
      setNewComment('');
    }
  }

  function toggleComments() {
    setShowComments(prevShowComments => !prevShowComments);
  }

  return (
    <div className="PostDetail">
      <div className="Post">
        <p><a href="#" onClick={handleBackClick}>&lt; Back</a></p>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
        <hr />
        <div className="PostButtons">
          <LikeBtn />
          <button className='ShowBtn' onClick={toggleComments}>
            {showComments ? 'Hide Comments' : 'Show Comments'}
          </button>
        </div>
      </div>

      <div className="Comments">
        {showComments && (
          <div className="comments-section">
            <fieldset>
              <legend>Comments</legend>
              <ul className="comments-list">
                {comments.map(comment => (
                  <li key={comment.id} className="comment-item">
                    <p><strong>{comment.user.fullName}</strong> says: {comment.body}</p>
                  </li>
                ))}
              </ul>
            </fieldset>
            <div className="new-comment">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment"
              />
              <button onClick={handleCommentSubmit}>Submit</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <p>Page not found. <a href="#/">return home</a></p>
  )
}

export default App;
