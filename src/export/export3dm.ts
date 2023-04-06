interface ExporterBase {
  CanExport(format: FileFormat, extension: string): boolean;
  ExportContent(
    exporterModel: any,
    format: FileFormat,
    files: any[],
    onFinish: () => void
  ): void;
}
interface Color {
  r: number;
  g: number;
  b: number;
}

interface RhinoColor extends Color {
  a: number;
}
class Exporter3dm implements ExporterBase {
  private rhino: typeof rhino3dm;

  constructor() {
    this.rhino = null;
  }

  CanExport(format: FileFormat, extension: string): boolean {
    return format === FileFormat.Binary && extension === "3dm";
  }

  async ExportContent(
    exporterModel: any,
    format: FileFormat,
    files: any[],
    onFinish: () => void
  ) {
    if (this.rhino === null) {
      this.rhino = await import("rhino3dm");
    }
    this.ExportRhinoContent(exporterModel, files, onFinish);
  }

  private ColorToRhinoColor(color: Color): RhinoColor {
    return { r: color.r, g: color.g, b: color.b, a: 255 };
  }

  private ExportRhinoContent(
    exporterModel: any,
    files: any[],
    onFinish: () => void
  ): void {
    // 创建一个新的 Rhinoceros 文件
    const rhinoDoc = new this.rhino.File3dm();

    // 遍历已转换的网格
    exporterModel.EnumerateTransformedMeshes((mesh: any) => {
      // ...同样的逻辑，将 JavaScript代码中的函数和变量转换为 TypeScript });
      let meshBuffer = ConvertMeshToMeshBuffer(mesh);
      for (
        let primitiveIndex = 0;
        primitiveIndex < meshBuffer.PrimitiveCount();
        primitiveIndex++
      ) {
        let primitive = meshBuffer.GetPrimitive(primitiveIndex);
        let threeJson = {
          data: {
            attributes: {
              position: {
                itemSize: 3,
                type: "Float32Array",
                array: primitive.vertices,
              },
              normal: {
                itemSize: 3,
                type: "Float32Array",
                array: primitive.normals,
              },
            },
            index: {
              type: "Uint16Array",
              array: primitive.indices,
            },
          },
        };

        let material = exporterModel.GetMaterial(primitive.material);
        let rhinoMaterial = new this.rhino.Material();
        rhinoMaterial.name = this.GetExportedMaterialName(material.name);
        if (material.type === MaterialType.Phong) {
          rhinoMaterial.ambientColor = ColorToRhinoColor(material.ambient);
          rhinoMaterial.specularColor = ColorToRhinoColor(material.specular);
        }
        rhinoMaterial.diffuseColor = ColorToRhinoColor(material.color);
        rhinoMaterial.transparency = 1.0 - material.opacity;

        let rhinoMaterialIndex = rhinoDoc.materials().count();
        rhinoDoc.materials().add(rhinoMaterial);

        let rhinoMesh = new this.rhino.Mesh.createFromThreejsJSON(threeJson);
        let rhinoAttributes = new this.rhino.ObjectAttributes();
        rhinoAttributes.name = this.GetExportedMeshName(mesh.GetName());
        rhinoAttributes.materialSource =
          this.rhino.ObjectMaterialSource.MaterialFromObject;
        rhinoAttributes.materialIndex = rhinoMaterialIndex;
        rhinoDoc.objects().add(rhinoMesh, rhinoAttributes);
      }
    });
    // 设置导出参数
    const writeOptions = new this.rhino.File3dmWriteOptions();
    writeOptions.version = 6;

    // 将 rhinoDoc 转换为 ArrayBuffer
    const rhinoDocBuffer = rhinoDoc.toByteArray(writeOptions);
    // 将 rhinoDocBuffer 添加到 rhinoFile 对象中
    let rhinoFile = new ExportedFile("model.3dm");
    rhinoFile.SetBufferContent(rhinoDocBuffer);
    // 将导出的文件添加到 files 数组中
    files.push(rhinoFile);
    // 调用 onFinish 函数通知导出过程已完成
    onFinish();
  }
}
