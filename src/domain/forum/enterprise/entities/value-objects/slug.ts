export class Slug {
  public value: string;
  private constructor(value: string) {
    this.value = value;
  }

  static create(slug: string) {
    return new Slug(slug);
  }

  /**
   * Receives a string and normalize it as a slug
   *
   * Example: "An example text" -> "an-example-text"
   *
   * @param text {string}
   */

  static createFromText(text: string) {
    const slugText = text
      .normalize("NFKC")
      .toLocaleLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/_/g, "-")
      .replace(/--+/g, "-")
      .replace(/-$/g, "");

    return new Slug(slugText);
  }
}
