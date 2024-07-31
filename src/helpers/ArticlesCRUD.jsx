import {
  query,
  collection,
  getDocs,
  orderBy,
  doc,
  getDoc,
  addDoc,
  Timestamp,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";

// Get Articles
export async function getArticles() {
  try {
    const q = query(collection(db, "articles"), orderBy("date", "desc")); // Sorting by 'date' in descending order
    const querySnapshot = await getDocs(q);
    const articles = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("All articles fetched");
    return articles;
  } catch (error) {
    console.error(error);
  }
}
/* -------------------------------------------------------------------------- */

// Get Article By Id
export const getArticleById = async (articleId) => {
  try {
    const articleRef = doc(db, "articles", articleId);
    const articleSnapshot = await getDoc(articleRef);

    if (articleSnapshot.exists()) {
      console.log(`Article ID ${articleId} fetched`);
      return articleSnapshot.data();
    }
  } catch (error) {
    console.error(error);
  }
};
/* -------------------------------------------------------------------------- */

// Add Article
export async function addArticle(image, title, description, user) {
  try {
    await addDoc(collection(db, "articles"), {
      image: image,
      title: title,
      description: description,
      authorId: user.uid,
      date: Timestamp.fromDate(new Date()),
    });
    console.log("Article added");
  } catch (error) {
    console.error(error);
  }
}
/* -------------------------------------------------------------------------- */

// Delete Article
export const deleteArticle = async (articleId, user) => {
  try {
    const articleRef = doc(db, "articles", articleId);
    await deleteDoc(articleRef);
    console.log("Article deleted");
  } catch (error) {
    console.error(error);
  }
};
/* -------------------------------------------------------------------------- */

// Update Article
export const updateArticle = async (articleId, updatedFields, currentUser) => {
  try {
    const articleRef = doc(db, "articles", articleId);
    await updateDoc(articleRef, updatedFields);
    console.log("Article updated");
  } catch (error) {
    console.error(error);
  }
};
/* -------------------------------------------------------------------------- */
