# Admitech Mcq service

Team : Lucas Gonçalves, Inès Missoum, Fatima Machhouri, Thomas Falcone, Raphael Luciano, Martin Cayuelas

## Routes



### Accueil

![#1c7cf0 ](https://placehold.it/15/1c7cf0/000000?text=+) **GET** - ``/mcq/:id`` -  Renvoie l'ensemble des informations d'un QCM.
  - 200 - Les informations du QCM ont été récupérées
  - 404 - Le QCM n'a pas été trouvé

![#1c7cf0 ](https://placehold.it/15/1c7cf0/000000?text=+) **GET** - ``/candidat/:id/results`` -  Renvoie l'ensemble des réponses d'un candidat.
  - 200 - Les réponses du candidat ont été récupérées
  - 404 - Le candidat n'a pas été trouvé

![#49f053 ](https://placehold.it/15/49f053/000000?text=+) **POST** - ``/responseCandidat`` -  Créer une nouvelle réponse de candidat (et le candidat si il n'existe pas)
  - 200 - Les élément créé
  - 400 - Un ou des élèments ne vont pas dans la requete.

![#49f053 ](https://placehold.it/15/49f053/000000?text=+) **POST** - ``/mcq`` - Créer un nouveau QCM.
   - 201 - Elément créé.
   - 400 - Un ou des élèments ne vont pas dans la requete.
