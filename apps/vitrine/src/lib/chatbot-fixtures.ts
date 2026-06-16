/**
 * Données FICTIVES du chatbot "Emma" (front seulement, pour l'aperçu).
 * À terme, ces contenus seront éditables depuis l'admin (collection config/pages).
 */

export const CHATBOT_SALUTATION =
  "Coucou, c'est Emma 👋 Une question sur mes prestations ? Choisissez ci-dessous !";

export interface QuestionChatbot {
  question: string;
  reponse: string;
}

export const CHATBOT_QUESTIONS: QuestionChatbot[] = [
  {
    question: "Comment se passe une séance ?",
    reponse:
      "Je viens chez vous une demi-journée, je cuisine vos repas de la semaine, je mets tout en barquettes étiquetées et je laisse la cuisine propre 🙂",
  },
  {
    question: "Qui fait les courses ?",
    reponse:
      "Au choix ! Vous les faites vous-même, ou je m'en charge — dans ce cas le montant des courses + un forfait service est ajouté.",
  },
  {
    question: "Vous intervenez où ?",
    reponse:
      "À Laval et dans un rayon de 20 km. Dites-moi votre commune et je vous confirme tout de suite !",
  },
  {
    question: "Comment réserver ?",
    reponse:
      "Le plus simple : contactez-moi via la page Contact ou par téléphone, et on cale une date ensemble 📅",
  },
];
