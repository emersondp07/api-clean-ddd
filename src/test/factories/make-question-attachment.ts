import { UniqueEntityID } from "@/core/entities/unique-entity";
import {
  QuestionAttachment,
  QuestionAttachmentProps,
} from "../../domain/forum/enterprise/entities/question-attachment";

export function makeQuestionAttachment(
  override: Partial<QuestionAttachmentProps> = {},
  id?: UniqueEntityID
) {
  const questionQuestionAttachment = QuestionAttachment.create(
    {
      questionId: new UniqueEntityID(),
      attachmentId: new UniqueEntityID(),
      ...override,
    },
    id
  );

  return questionQuestionAttachment;
}
