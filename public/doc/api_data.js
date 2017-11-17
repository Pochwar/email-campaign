define({ "api": [
  {
    "type": "delete",
    "url": "/api/v1/entreprises/:entrepriseId",
    "title": "Delete one entreprise",
    "group": "Entreprises",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>a valid access token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": \"YOUR_TOKEN\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":id",
            "description": "<p>Entreprise's id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"success\": true\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/server.js",
    "groupTitle": "Entreprises",
    "name": "DeleteApiV1EntreprisesEntrepriseid"
  },
  {
    "type": "get",
    "url": "/api/v1/entreprises",
    "title": "Get all entreprises",
    "group": "Entreprises",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>a valid access token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": \"YOUR_TOKEN\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n  {\n      \"id\": \"5a0c42394b2d38635f474b4b\",\n      \"label\": \"IMIE\",\n      \"url_ad\": \"http://perdu.com/img.jpg\",\n      \"url_picture\": \"http://perdu.com/img.jpg\",\n      \"campaigns\": [456789,123456]\n  },\n  {\n      \"id\": \"5a0c42394b2d38635f474b4c\",\n      \"label\": \"Intel\",\n      \"url_ad\": \"http://perdu.com/img.jpg\",\n      \"url_picture\": \"http://perdu.com/img.jpg\",\n      \"campaigns\": [456789,123456]\n  }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/server.js",
    "groupTitle": "Entreprises",
    "name": "GetApiV1Entreprises"
  },
  {
    "type": "get",
    "url": "/api/v1/entreprises/:entrepriseId",
    "title": "Get one entreprise",
    "group": "Entreprises",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>a valid access token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": \"YOUR_TOKEN\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":id",
            "description": "<p>Entreprise's id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"id\": \"5a0c42394b2d38635f474b4b\",\n    \"label\": \"IMIE\",\n    \"url_ad\": \"http://perdu.com/img.jpg\",\n    \"url_picture\": \"http://perdu.com/img.jpg\",\n    \"campaigns\": [456789,123456]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/server.js",
    "groupTitle": "Entreprises",
    "name": "GetApiV1EntreprisesEntrepriseid"
  },
  {
    "type": "post",
    "url": "/api/v1/entreprises",
    "title": "Create one entreprise",
    "group": "Entreprises",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "label",
            "description": "<p>Name of entreprise</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of entreprise</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of entreprise</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "url_ad",
            "description": "<p>Url of redirect</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "url_picture",
            "description": "<p>Url of picture</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"create\": \"ok\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/server.js",
    "groupTitle": "Entreprises",
    "name": "PostApiV1Entreprises"
  },
  {
    "type": "post",
    "url": "/api/v1/login",
    "title": "Login",
    "group": "Entreprises",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of entreprise</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of entreprise</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"id\": \"monid\"\n    \"token\": \"unsupertokenavecdes123etdeslettres\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/server.js",
    "groupTitle": "Entreprises",
    "name": "PostApiV1Login"
  },
  {
    "type": "put",
    "url": "/api/v1/entreprises/:entrepriseId",
    "title": "Edit one entreprise",
    "group": "Entreprises",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>a valid access token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": \"YOUR_TOKEN\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":id",
            "description": "<p>Entreprise's id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "label",
            "description": "<p>Name of entreprise</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of entreprise</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of entreprise</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "url_ad",
            "description": "<p>Url of redirect</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "url_picture",
            "description": "<p>Url of picture</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"modified\": \"6\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/server.js",
    "groupTitle": "Entreprises",
    "name": "PutApiV1EntreprisesEntrepriseid"
  },
  {
    "type": "put",
    "url": "/api/v1/entreprises/:entrepriseId/:campaignId/add",
    "title": "Add a campaign for a company",
    "group": "Entreprises",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>a valid access token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": \"YOUR_TOKEN\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":entrepriseId",
            "description": "<p>Entreprise's id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":campaignId",
            "description": "<p>Campaign's id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"success\": true\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/server.js",
    "groupTitle": "Entreprises",
    "name": "PutApiV1EntreprisesEntrepriseidCampaignidAdd"
  },
  {
    "type": "put",
    "url": "/api/v1/entreprises/:entrepriseId/:campaignId/remove",
    "title": "Remove a campaign for a company",
    "group": "Entreprises",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>a valid access token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": \"YOUR_TOKEN\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":entrepriseId",
            "description": "<p>Entreprise's id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":campaignId",
            "description": "<p>Campaign's id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"success\": true\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/server.js",
    "groupTitle": "Entreprises",
    "name": "PutApiV1EntreprisesEntrepriseidCampaignidRemove"
  }
] });
