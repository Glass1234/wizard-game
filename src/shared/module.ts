export function applyInstance<T extends Instance>(
	inst: T,
	props: Partial<WritableInstanceProperties<T>>,
): T {
	for (const [key, value] of pairs(props)) {
		if (key !== "Parent") {
			(inst as unknown as Record<string, unknown>)[key as string] = value;
		}
		
	}

	inst.Parent = (props as Record<string, unknown>).Parent as Instance | undefined;
	return inst;
}

export function getRandomArbitrary(min: number, max: number): number {
  return math.random() * (max - min) + min;
}
