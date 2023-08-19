import firebase from "firebase/compat/app";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    onSnapshot,
    query,
    setDoc,
    where
} from "firebase/firestore";
import {updateProfile} from "firebase/auth";

export const getDocFromCollection = async (collection, document) => {
    const db = firebase.firestore();
    const snapshot = await db.collection(collection).doc(document).get()
    return snapshot.data() ? snapshot.data() : {}
}

export const getDocFromCollectionRT = async (coll, docum) => {
    //realtime update
    const db = firebase.firestore();
    const docRef = await doc(db, coll, docum);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap?.data()
    } else {
        return {}
    }
}

export const deleteDocument = async (collection, document) => {
    const db = firebase.firestore();
    await deleteDoc(doc(db, collection, document));
}

export const createDocOfCollection = async (collName, data) => {
    const db = firebase.firestore();
    const docRef = await addDoc(collection(db, collName), data);
}

export const createDocOfCollectionWithId = async (collName, id, data) => {
    const db = firebase.firestore();
    const docRef = await setDoc(doc(db, collName, id), data);
}

export const getAllDocFromCollection = async (collName) => {
    const db = firebase.firestore();
    let array = []
    const querySnapshot = await getDocs(collection(db, collName));
    for (let doc of querySnapshot.docs) {
        array.push({...doc.data(), id: doc.id})
    }
    return array
}
//this function call every time when change the collection( for realtime update)
export const getAllDocFromCollectionRT = async (collName, callBack) => {
    const db = firebase.firestore();

    onSnapshot(collection(db, collName), (querySnapshot) => {
        let array = []
        for (let document of querySnapshot.docs) {
            array.push({...document?.data(), id: document?.id})
        }
        callBack(array)
    });
}

export const filterDocsFromCollection = async (coll, fields, filters) => {
    const db = firebase.firestore();
    let filterArray = []
    for (let item of filters) {
        if (item[2] == '') {
            continue
        }
        filterArray.push(where(item[0], item[1], item[2]))
    }
    const collRef = await collection(db, coll);
    const queryData = await query(collRef, ...filterArray);
    let array = []
    const querySnapshot = await getDocs(queryData)
    for (let document of querySnapshot.docs) {
        array.push({...document.data(), id: document.id})
    }
    return array
}

export const filterDocsFromCollectionRT = async (coll, fields, filters, callBack) => {
    //real time update
    const db = firebase.firestore();
    let filterArray = []
    for (let item of filters) {
        if (item[2] == '') {
            continue
        }
        filterArray.push(where(item[0], item[1], item[2]))
    }
    const collRef = await collection(db, coll);
    const queryData = await query(collRef, ...filterArray);

    onSnapshot(queryData, (querySnapshot) => {
        let array = []
        for (let document of querySnapshot.docs) {
            array.push({...document?.data(), id: document?.id})
        }
        callBack(array)
    });
}

export const updateAuthProfile = async (user, model) => {
    let res = await updateProfile(user, model)
}

export const updateDocOFCollection = async (coll, document, data) => {
    const db = firebase.firestore();
    const docRef = await setDoc(doc(db, coll, document), data);
}

export const getRefFieldOnlyFromFilter = (coll, field, filters) => {
    return async (dispatch) => {

        let a = filters.map((item) => (where(item[0], item[1], item[2])))
        const db = firebase.firestore();
        const collRef = await collection(db, coll);
        const queryData = await query(collRef, ...a);
        let array = []
        const querySnapshot = await getDocs(queryData)
        for (let document of querySnapshot.docs) {
            let singleDoc = {}
            for (let [key, value] of Object.entries(document._document?.data?.value?.mapValue?.fields)) {
                if (value.referenceValue && key == field) {
                    let splitArray = value.referenceValue.split("/")
                    const docRef = await doc(db, splitArray[5], splitArray[6]);
                    const docSnap = await getDoc(docRef);
                    singleDoc[key] = docSnap.data()
                }
            }
            array.push(singleDoc)
        }
        return array
    }
}

// export const getCourseByStudent = (stID, courseID) => {
//     const db = firebase.firestore();
// }

