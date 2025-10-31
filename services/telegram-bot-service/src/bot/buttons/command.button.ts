export class CommandExpression {
  static c_start_exp = /^\/start/;
  static c_username_exp = /^\/username_(.+)$/;
}

export class CommandName {
  static c_start_na = "start";
}

export const commandPatterns = [CommandExpression.c_start_exp, CommandExpression.c_username_exp];
