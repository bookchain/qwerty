import { async } from 'regenerator-runtime';
import { clear } from 'console';
import 'regenerator-runtime/runtime';
import React, { useCallback, useMemo, useRef } from 'react';
import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import BookInput from '../BookInput/BookInput';
import './read.css';
import { Link } from 'react-router-dom';

// import { publicRoutes, privateRoutes } from '../router';

export default function Read({ isSignedIn, guestBook, wallet }) {
  const [readTimer, setReadTimer] = useState(0);
  const [bookBytes, setBook] = useState(null);
  const [rendi, setRendi] = useState();

  const read = async () => {
    setReadTimer((readTimer) => readTimer + 1);
    await guestBook.timer();
  };

  const createBookElementInPage = useCallback(() => {
    const div = document.createElement('div');
    div.id = 'area';

    document.querySelector('.containerBook').insertAdjacentElement('beforeend', div);
  }, []);

  const createBookInstance = useCallback(() => {
    const book = ePub(bookBytes);

    const rendition = book.renderTo('area', {
      height: '100vh',
      manager: 'continuous',
      flow: 'paginated',
      width: '100vw',
      allowScriptedContent: true,
    });
    setRendi(rendition);
    const displayed = rendition.display('epubcfi(/6/14[xchapter_001]!4/2/24/2[c001p0011]/1:799)');
  }, [bookBytes]);

  useEffect(() => {
    if (!bookBytes) {
      return;
    }
    createBookInstance();
    createBookElementInPage();
  }, [createBookInstance]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (bookBytes) {
        if (document.hidden) {
          console.log('close');
        } else {
          read();
          console.log('open');
        }
      }
    }, 60000);

    return () => {
      clearInterval(interval);
      console.log('interval clear');
    };
  }, [bookBytes]);

  return (
    <>
      <>
        <h1 className="readHeader">Add a book in .epub format </h1>
        <BookInput onBookLoaded={setBook} />
        <div className="containerBook" style={{ zIndex: bookBytes ? 1000 : -1000 }}></div>
      </>

      {bookBytes && (
        <>
          <Link to={'/'} className="closeBook">
            &#10006;
          </Link>
          <div className="nextPage" onClick={() => rendi.next()}></div>
          <div className="prevPage" onClick={() => rendi.prev()}></div>
        </>
      )}
      {/* <div
        id="area"
        style={{ opacity: showBook ? 1 : 0, zIndex: showBook ? 1000 : -1000 }}
        className="bookClassArea"></div> */}
    </>
  );
}
