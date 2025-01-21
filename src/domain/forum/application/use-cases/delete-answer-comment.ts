import { Either, failed, success } from "@/core/either";
import { AnswerCommentsRepository } from "../repositories/answer-comments-repository";
import { NotAllowedError } from "./errors/not-allowed-error";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string;
  answerCommentId: string;
}

type DeleteAnswerCommentUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>;

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answerComment = await this.answerCommentsRepository.findById(
      answerCommentId
    );

    if (!answerComment) {
      return failed(new ResourceNotFoundError());
    }

    if (answerComment.authorId.toString() !== authorId) {
      return failed(new NotAllowedError());
    }

    await this.answerCommentsRepository.delete(answerComment);

    return success({});
  }
}
