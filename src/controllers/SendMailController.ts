import { resolve } from 'path'
import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveyRepository";
import { SurveyUsersRepository } from "../repositories/SurveyUsersRepository";
import { UsersRepository } from "../repositories/UsersRepository";
import SendMailService from "../services/SendMailService";

class SendMailController {

  async execute(request: Request, response: Response) {
    const { email, survey_id } = request.body;

    const userRepository = getCustomRepository(UsersRepository);
    const surveyRepository = getCustomRepository(SurveysRepository);
    const surveyUsersRepository = getCustomRepository(SurveyUsersRepository);

    const user = await userRepository.findOne({ email });

    if (!user) {
      return response.status(400).json({ error: "User does not exists" })
    }

    const survey = await surveyRepository.findOne({ id: survey_id });

    if (!survey) {
      return response.status(400).json({ error: "Survey does not exists" })
    }

    const npsPath = resolve(__dirname, '..', 'views', 'emails', 'npsMail.hbs');



    const surveyUserAlreadyExists = await surveyUsersRepository.findOne({ where: { user_id: user.id, value: null }, relations: ["user", "survey"] },)

    const variables = { name: user.name, title: survey.title, description: survey.description, id: "", link: process.env.URL_MAIL }

    if (surveyUserAlreadyExists) {
      variables.id = surveyUserAlreadyExists.id;
      await SendMailService.execute(email, survey.title, variables, npsPath);
      return response.json(surveyUserAlreadyExists)
    }

    const surveyUser = surveyUsersRepository.create({
      user_id: user.id,
      survey_id,
    });

    await surveyUsersRepository.save(surveyUser);
    variables.id = surveyUser.id;


    await SendMailService.execute(email, survey.title, variables, npsPath);

    return response.json(surveyUser)


  }

}

export { SendMailController }