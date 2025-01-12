export function Logger(target: any, propertyName: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = async function (...args: any[]) {
    console.log(`Executing ${propertyName} with args:`, args);
    return originalMethod.apply(this, args);
  };
}
