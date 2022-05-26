/** @format */

import City from '../../../model/city';
import connectDb from '../../../utils/mongodb';
import { performance } from 'perf_hooks';
import redis from 'redis';
import util from 'util';

const redisPort = 6379;
const client = redis.createClient(redisPort);
const key = 'example-key';

export default async (req, res) => {
  connectDb();
  const { method } = req;

  switch (method) {
    case 'GET':
      await GetCity(req, res);

      // await handler(req, res);
      break;
    case 'POST':
      await AddCity(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
      
  }
};

const AddCity = async (req, res) => {
  try {
    const city = await City.create(req.body);
    res.status(201).json({
      success: true,
      city,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const GetCity = async (req, res) => {
  try {
    const city = await City.find();
    console.log(city, 'city');

    res.status(200).json({
      success: true,
      city,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Promisify the get command so we can use async/await.
client.get = util.promisify(client.get);

const handler = async (req, res) => {
  try {
    const startTime = performance.now();
    const response = await client.get(key);

    if (response) {
      res.status(200).json(JSON.parse(response));
    } else {
      console.log("FFFFF")
      // Waiting 1 second to simulate a slow response from another DB query
      // await new Promise((resolve) =>
      //   setTimeout(resolve, 1000)
      // );
      // As a contrived example, let's say this is the expected result from the database
      const data = await City.find();

      // try {
      //   const city = await City.find();
      //   console.log(city, 'city');

      //   res.status(200).json({
      //     success: true,
      //     city,
      //   });
      // } catch (error) {
      //   res.json({
      //     success: false,
      //     message: error.message,
      //   });
      // }

      // Here we are caching the result for 15 seconds to Redis
      client.setex(key, 2, JSON.stringify(data));
      res.status(200).json(data);
    }

    const endTime = performance.now();
    console.log(
      `Call took ${endTime - startTime} milliseconds`
    );
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
