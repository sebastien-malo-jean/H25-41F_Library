# API Personnage D & D

## Documentation

Cette API permet d'afficher, d'ajouter, de modifier et de supprimer des personnages de la base de données.

[Lien vers le code Github](https://github.com/sebastien-malo-jean/H25-41F_Library)

## Routes

### Récupération de la liste de tous les personnages

[GET /characters](https://h25-41f-library.onrender.com/characters)
<!-- https://h25-41f-library.onrender.com -->

#### paramètres possibles

- [https://h25-41f-library.onrender.com/characters?limit=2&orderBy=name&orderDirection=asc](https://h25-41f-library.onrender.com/characters?limit=2&orderBy=name&orderDirection=asc)

- orderBy
  - name
  - genre
  - class
  - race
  - alignement

- orderDirection
  - asc
  - desc

- limit
  - un nombre entier

### Récupération de la liste des personnages par statistiques

#### paramètres possibles pour les statistiques

- orderBy
  - [strength](https://h25-41f-library.onrender.com/characters/statistics/strength)
  - [dexterity](https://h25-41f-library.onrender.com/characters/statistics/dexterity)
  - [constitution](https://h25-41f-library.onrender.com/characters/statistics/constitution)
  - [intelligence](https://h25-41f-library.onrender.com/characters/statistics/intelligence)
  - [wisdom](https://h25-41f-library.onrender.com/characters/statistics/wisdom)
  - [charisma](https://h25-41f-library.onrender.com/characters/statistics/charisma)

- orderDirection
  - asc
  - desc

### Récupération d'un personnage spécifique

[GET /character/:id](https://h25-41f-library.onrender.com/characters/G7FrjAFaAZyEoLcuP6h0)

- Paramètre requis : id (l'identifiant du personnage à récupérer)

### Ajouter un nouveau personnage

[POST /characters/](https://h25-41f-library.onrender.com/characters/)

- Paramètre requis : un objet personnage dans le corp de la requête.

```javascript
    const character{
      "charVoc": "", //npc ou joueur
      "characterThumbnail": ".jpg",
      "name": "",
      "genre": "",
      "class": [""],
      "race": [""],
      "alignement": [""],
      "Traits": {
        "PersonalityTraits": "",
        "Ideals": "",
        "Bonds": "",
        "Flaws": "",
      },
      "exp": 0,
      "lvl": 1,
      "hitPoints": {
        "totalHP": 20,
        "currentHP": 20,
      },
      "statistics": {
        "strength": 0,
        "dexterity": 0,
        "constitution": 0,
        "intelligence": 0,
        "wisdom": 0,
        "charisma": 0,
      },
    },
```

### Modifier un personnage existant

[PUT characters/:id](https://h25-41f-library.onrender.com/characters/:id)

- Paramètre requis :
  - id (l'identifiant du personnage à récupérer)
  - un objet personnage dans le corp de la requête.

```js
    const character{
      "charVoc": "", //npc ou joueur
      "characterThumbnail": ".jpg",
      "name": "",
      "genre": "",
      "class": [""],
      "race": [""],
      "alignement": [""],
      "Traits": {
        "PersonalityTraits": "",
        "Ideals": "",
        "Bonds": "",
        "Flaws": "",
      },
      "exp": 0,
      "lvl": 1,
      "hitPoints": {
        "totalHP": 20,
        "currentHP": 20,
      },
      "statistics": {
        "strength": 0,
        "dexterity": 0,
        "constitution": 0,
        "intelligence": 0,
        "wisdom": 0,
        "charisma": 0,
      },
    },
```

### Supprimer un personnage existant

[DELETE characters/:id](https://h25-41f-library.onrender.com/characters/:id)

- Paramètre requis : id (l'identifiant du personnage à suprimer)

### Insciption d'utilisateurs

[POST users/inscription](https://h25-41f-library.onrender.com/users/inscription)\
[POST users/connection](https://h25-41f-library.onrender.com/users/connection)

- paramètres requis : information sur l'utilisateur

```JS
  const user{
    "name": "Maxime Lacasse",
    "email": "maxime@lacasse.com",
    "password":"12345678"
}
```
