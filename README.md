# Admitech Mcq service

Team : Lucas Gonçalves, Inès Missoum, Fatima Machhouri, Thomas Falcone, Raphael Luciano, Martin Cayuelas

## Routes

![#1c7cf0 ](https://placehold.it/15/1c7cf0/000000?text=+) **GET** - ``/mcq/:id`` -  Renvoie l'ensemble des informations d'un QCM (sans la validité des réponses).
  - 200 - Les informations du QCM ont été récupérées
  - 404 - Le QCM n'a pas été trouvé


![#1c7cf0 ](https://placehold.it/15/1c7cf0/000000?text=+) **GET** - ``/mcqs`` -  Renvoie les informations générales de tous les QCM.
  - 200 - Les informations ont été récupérées


![#1c7cf0 ](https://placehold.it/15/1c7cf0/000000?text=+) **GET** - ``/mcqAdmin/:id`` -  Renvoie l'ensemble des informations d'un QCM (avec la validité des réponses).
  - 200 - Les informations du QCM ont été récupérées
  - 404 - Le QCM n'a pas été trouvé


![#1c7cf0 ](https://placehold.it/15/1c7cf0/000000?text=+) **GET** - ``/candidate/:id/mcq`` -  Renvoie l'ensemble des informations du QCM attribué au candidat.
  - 200 - Les informations du QCM ont été récupérées
  - 404 - Le QCM n'a pas été trouvé


![#1c7cf0 ](https://placehold.it/15/1c7cf0/000000?text=+) **GET** - ``/candidate/:id/note`` -  Renvoie la note du candidat pour son QCM.
  - 200 - La note a été récupérée
  - 404 - Le candidat n'a pas été trouvé


![#49f053 ](https://placehold.it/15/49f053/000000?text=+) **POST** - ``/responseCandidat`` -  Créer des nouvelle réponses de candidat.
  - 200 - Les élément créé
  - 400 - Un ou des élèments ne vont pas dans la requete.


![#49f053 ](https://placehold.it/15/49f053/000000?text=+) **POST** - ``/mcq`` - Créer un nouveau QCM.
   - 201 - Elément créé.
   - 400 - Un ou des élèments ne vont pas dans la requete.



 ![#49f053 ](https://placehold.it/15/f0731c/000000?text=+) **PUT** - ``/attribute/:idMcq/:idCandidature`` - Attribue un QCM à un candidat.
    - 201 - QCM attribué.
    - 400 - Un ou des élèments ne vont pas dans la requete.


 ![#49f053 ](https://placehold.it/15/f01c1c/000000?text=+) **DELETE** - ``/mcq/:id`` - Supprimer un QCM.
    - 201 - QCM supprimé.
    - 400 - Un ou des élèments ne vont pas dans la requete.
