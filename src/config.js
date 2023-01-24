export default {
    PORT: process.env.PORT || 8080,
    fileSystem: {
        path: './DB'
    },
    mongodb: {
        cnxStr: 'mongodb://127.0.0.1:27017/ecommerce',
        options : {
            authSource: 'admin',
            user: 'pepe',
            pass: 'asd456',
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    },
    firebase: {
        'type': 'service_account',
        'project_id': 'backend-142e1',
        'private_key_id': '4631d10afab9e6ab061eed3d5f285c41a36bfb78',
        'private_key': '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDWpSh/6tlfkHwp\n7dXH1WcdExr/HCVxJV8kSwdAhO44CZQ5d/KJkn9itULL+lCiHmjL2vF0ryISXyga\nljSklZLcMcTmctg9wLRkXvCEBW6h1Zv1eoS6Ue1KxohpoiCdPJ+Xz8PzZTtSb/Fe\nQVNomDEuFK6zmg8V4zu5qJgLloXxPJ8gd1ZZ97LsbtfFwhSDA8o6CN0eahOwg27U\nLzP9Ut69spsWVnnsEsCNjULepOSf0kNvmSmKBY3Zi1o3iZp2+sPQoPvtCJ82r+SN\nVTWGYvomfZEmhauSW+7M6od2vUsIqXd9qKuSlVHDTf5I5Js6vZKV7KhNRc9IU7cw\n3IrX/3D7AgMBAAECggEAFoiAF+2vpDim0EAHkVL14DeBPgbWZ2pk8opt2HgcCgX3\naZEOBSM7/EDLIl7E2EAZAE2by4QXL5aNvzzFigGpyTPwV8D2soToayEMXs+zLYof\nNUYHaQfwwUjWSUCb6+XRWz6Uc5jNAXp+/EYfW3uerhe9v10M+F9ChdsNGypSJWDm\njfR5WtI+Azv7le1jjxL9W+53GHt9KL7c/QvTIwxLhFl8SC+JZMH6a7zx85I+8nMk\nM1+DEIWDbRYl1tyLxM4+YnKTE2c7UGSzvNscgNqQdhtBNROZFAI27ymN2l6zOgHA\n9y0itJrpwQceew9DkH+k9VUV2NDKhVxFjEJTQ+qJAQKBgQD1u1GRa73YMLjQOKQj\n4QBwapbPSrajc1k89ZxxRBZSvyqTgPQyQRugJnZEpXHesYna5420Ib+DVVj2sawR\njvrVuOMgWfFOgRx/XnjhF0RXb5EDqnxxiVXC1vxiErEnc9c0SPvwLfspyrILKsRq\n70WyCxjtlH3yTd++LwCNqbukhQKBgQDfnUuZfw9Bhlpjwl1KERmC7fa0RCAtZvy8\nJH8bePXA9NHUUkPbv/mJ3UpHbp/g2C1ew3EGE2o14U9ztWeOzzfGLbvdu8lfTyzX\nbpsWqvym22ZTuS2clILJrUePN4ZGYggH7xbuhziUecRzocgg0xah2HGtG1yThYML\nvbJVD2N3fwKBgEXEZDlEfMcXtjEwE7I4HLbOHHlIPiiUBF8hYMRrz2a47e6pKyvl\nfmFu6h89VeIjR/+FxJ7DAivYnISWF0N489CgSKQTxUZDtAKZoPpPb9DfVS3URra5\nhkbmYQu7QN7xrcUjf5xGgcvwx7IR92hg/Mm7Ct3RThzwbTkDAUY3TZY9AoGAJ4BI\nz4ezcTbDluXJxwC4SfmxX+y85mhP8whbb8XxW7Gjs2cI17PU5/awXWf8VCK7+QZ7\nW8BoPbZca6s67O5MAvUnP6chjnWVDUVbnih8UxlkvRt0JDnT1L6IapM7ZAmDM6uX\nmHFInGnaOzbz/GBtmg97HUI9G041dQiAjSgXwQ8CgYEAmMGO62BxPLmdesw9rYBi\nJEfxNQPHvMUsxYh1dtglypgiCV0c5pmLfSkEe4G5eZqO97ysrMgGMyacOTeH/Up1\nXin33D7O+IurJuBWXwJw8m1k5Wzh4kPMBQm6AfhZXRFrLQdAEmETOX7E7lPFuVDu\nbX0FV5QZ8Tc101Fs5fI0fyE=\n-----END PRIVATE KEY-----\n',
        'client_email': 'firebase-adminsdk-joejx@backend-142e1.iam.gserviceaccount.com',
        'client_id': '107923789963666962510',
        'auth_uri': 'https://accounts.google.com/o/oauth2/auth',
        'token_uri': 'https://oauth2.googleapis.com/token',
        'auth_provider_x509_cert_url': 'https://www.googleapis.com/oauth2/v1/certs',
        'client_x509_cert_url': 'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-joejx%40backend-142e1.iam.gserviceaccount.com'
    },
    mongoRemote: {
        client: 'mongodb',
        cnxStr: 'mongodb+srv://admin:adminpwd@cluster0.nieryoj.mongodb.net/ecommerce?retryWrites=true&w=majority',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    }
}