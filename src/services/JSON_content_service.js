import { ref } from "firebase/storage";
import { firebaseStorage } from "../firebase";

// externalizing JSON files using firebase storage
export const FilterTopicListFRRef = ref(firebaseStorage, 'json/FilterTopic-FR.json');
export const FilterTopicListENRef = ref(firebaseStorage, 'json/FilterTopic-EN.json');
export const TopicListFRRef = ref(firebaseStorage, 'json/HtmlTopic-FR.json');
export const TopicListENRef = ref(firebaseStorage, 'json/HtmlTopic-EN.json');