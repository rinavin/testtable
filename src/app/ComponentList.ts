import { ComponentListBase } from "./ComponentListBase";
import { Component } from "@angular/core";

import { test } from "./test/test.component";

import { table } from "./table/table.component";

export class ComponentsList extends ComponentListBase {
	static compHash: { [x: string]: any } = {
		test: test,

		table: table
	};

	static ComponentArray: any[] = [test, table];

	static getArray() {
		return this.ComponentArray;
	}

	public getComponents(name: string): Component {
		return ComponentsList.compHash[name];
	}

	public static getAllComponents() {
		return this.ComponentArray;
	}
}
