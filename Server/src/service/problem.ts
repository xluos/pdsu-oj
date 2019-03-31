import { provide } from 'midway';
import { IProblem } from "../interface";
// import { prisma } from '../model/generated/prisma-client';


@provide('problemService')
export class ProblemService {
  getInfo(id: number):Promise<IProblem> {
    
    return 
  }
  create(options: IProblem): Promise<IProblem> {
    return 
  }
  update(options: IProblem): Promise<IProblem> {
    return 
  }
  delete(id: number): Promise<boolean> {
    return 
  }
}