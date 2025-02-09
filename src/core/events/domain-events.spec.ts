import { AggregateRoot } from "../entities/aggregate-root";
import { UniqueEntityID } from "../entities/unique-entity";
import { DomainEvent } from "./domain-event";
import { DomainEvents } from "./domain-events";

class CustomAggregateCreated implements DomainEvent {
  public ocurredAt: Date;
  private aggregate: CustomAggregate;

  constructor(aggreagate: CustomAggregate) {
    this.ocurredAt = new Date();
    this.aggregate = aggreagate;
  }

  public getAggregateId(): UniqueEntityID {
    return this.aggregate.id;
  }
}

class CustomAggregate extends AggregateRoot<null> {
  static create() {
    const aggregate = new CustomAggregate(null);

    aggregate.addDomainEvent(new CustomAggregateCreated(aggregate));

    return aggregate;
  }
}

describe("Domain Events", () => {
  it("should be able to dispatch and listen to events", () => {
    const callbackSpy = vi.fn();

    // ouvindo o evento de resposta criada
    DomainEvents.register(callbackSpy, CustomAggregateCreated.name);

    // Criando uma resposta sem salvar no banco
    const aggregate = CustomAggregate.create();

    // Assegurando que o evento foi criado porem não foi disparado
    expect(aggregate.domainEvents).toHaveLength(1);

    // Salvando a resposta no banco de dados e assim disparando o evento
    DomainEvents.dispatchEventsForAggregate(aggregate.id);

    // O subscribe ouve o evento e faz o que precisa ser feito com o dado
    expect(callbackSpy).toHaveBeenCalled();
    expect(aggregate.domainEvents).toHaveLength(0);
  });
});
