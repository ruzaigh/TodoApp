export class Note{
  constructor(
   public id: string,
   public title: string,
   public content: string,
   public noteId?: string,
   public userId?: string,
  ) {}
}
