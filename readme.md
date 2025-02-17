# API Personnage D & D

## Documentation

Cette API permet d'afficher, d'ajouter, de modifier et de supprimer des personnages de la base de données.

[Lien vers le code Github](https://github.com/sebastien-malo-jean/H25-41F_Library)

## Routes

### Récupération de la liste de tous les personnages

[GET /character](http://localhost:3000/character)

#### paramètres possibles

- [http://localhost:3000/character?limit=2&orderBy=name&orderDirection=asc](http://localhost:3000/character?limit=2&orderBy=name&orderDirection=asc)

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

### Récupération d'un personnage spécifique

[GET /character/:id](http://localhost:3000/character/G7FrjAFaAZyEoLcuP6h0)

- Paramètre requis : id (l'identifiant du personnage à récupérer)

### Ajouter un nouveau personnage

[POST /character/](http://localhost:3000/character/)

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

[PUT character/:id](http://localhost:3000/character/:id)

- Paramètre requis :
  - id (l'identifiant du personnage à récupérer)
  - un objet personnage dans le corp de la requête.

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

### Supprimer un personnage existant

[DELETE character/:id](http://localhost:3000/character/:id)

- Paramètre requis : id (l'identifiant du personnage à suprimer)
