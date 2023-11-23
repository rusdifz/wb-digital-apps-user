import { UserProfile } from "../../entities";

export const Database = () => ({
    config_db: {
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
       UserProfile
      ],
      synchronize: process.env.ENV == "development" ? true : false,
      autoLoadEntities: process.env.ENV == "development" ? true : false,
      logging: process.env.ENV == "development" ? false: true
    }
});
