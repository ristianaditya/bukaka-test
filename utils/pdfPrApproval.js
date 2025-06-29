// utils/pdfGenerator.js
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export class PurchaseRequisitionPDF {
  constructor() {
    this.doc = new jsPDF("p", "mm", "a4");
    this.pageWidth = this.doc.internal.pageSize.width;
    this.pageHeight = this.doc.internal.pageSize.height;
    this.margin = 15;
    this.lineHeight = 6;
  }

  generatePDF(purchaseData) {
    this.addHeader();
    this.addDocumentTitle();
    this.addDocumentInfo(purchaseData);
    this.addRequestorInfo(purchaseData);
    this.addItemsTable(purchaseData.items);
    this.addTotalSummary(purchaseData);
    this.addFooter();

    return this.doc;
  }

  addHeader() {
    this.doc.setDrawColor(0, 0, 0);
    this.doc.setLineWidth(0.5);
    this.doc.rect(this.margin, 10, this.pageWidth - this.margin * 2, 30);

    this.doc.setFontSize(14);
    this.doc.setFont("helvetica", "bold");
    this.doc.setTextColor(0, 0, 0);
    this.doc.text("PT. BUKAKA TEKNIK UTAMA Tbk", this.margin + 10, 18);

    this.doc.setFontSize(9);
    this.doc.setFont("helvetica", "normal");
    this.doc.text(
      "Industrial Complex, Jalan Raya Narogong Bekasi, Jawa Barat 16820",
      this.margin + 10,
      23,
    );
    this.doc.text(
      "Telp: (021) 5555-1234 | Email: info@bukaka.com",
      this.margin + 10,
      27,
    );
  }

  addDocumentTitle() {
    const y = 50;

    this.doc.setFillColor(33, 37, 41);
    this.doc.rect(this.margin, y, this.pageWidth - this.margin * 2, 12, "F");

    this.doc.setFontSize(16);
    this.doc.setFont("helvetica", "bold");
    this.doc.setTextColor(255, 255, 255);

    const title = "PURCHASE REQUISITION FORM";
    const titleWidth = this.doc.getTextWidth(title);
    this.doc.text(title, (this.pageWidth - titleWidth) / 2, y + 8);
  }

  addDocumentInfo(purchaseData) {
    const startY = 70;

    this.doc.setDrawColor(0, 0, 0);
    this.doc.setLineWidth(0.3);
    this.doc.rect(this.margin, startY, this.pageWidth - this.margin * 2, 25);

    const leftCol = this.margin + 5;
    const rightCol = this.pageWidth / 2 + 5;

    this.doc.line(this.pageWidth / 2, startY, this.pageWidth / 2, startY + 25);

    this.doc.setFontSize(10);
    this.doc.setTextColor(0, 0, 0);

    this.doc.setFont("helvetica", "bold");
    this.doc.text("PR Number:", leftCol, startY + 7);
    this.doc.text("Request Date:", leftCol, startY + 13);
    this.doc.text("Priority:", leftCol, startY + 19);

    this.doc.setFont("helvetica", "normal");
    this.doc.text(purchaseData.pr_no || "PR-", leftCol + 25, startY + 7);
    this.doc.text(purchaseData.req_date, leftCol + 25, startY + 13);
    this.doc.text("Normal", leftCol + 25, startY + 19);

    // Right column
    this.doc.setFont("helvetica", "bold");
    this.doc.text("Remark:", rightCol, startY + 7);
    this.doc.text("Status:", rightCol, startY + 13);

    this.doc.setFont("helvetica", "normal");
    this.doc.text(purchaseData.remarks, rightCol + 30, startY + 7);
    this.doc.text(purchaseData.status_approval, rightCol + 30, startY + 13);
  }

  addRequestorInfo(purchaseData) {
    const startY = 105;

    // Section header
    this.doc.setFillColor(248, 249, 250);
    this.doc.rect(
      this.margin,
      startY,
      this.pageWidth - this.margin * 2,
      8,
      "F",
    );
    this.doc.setDrawColor(0, 0, 0);
    this.doc.rect(this.margin, startY, this.pageWidth - this.margin * 2, 8);

    this.doc.setFontSize(11);
    this.doc.setFont("helvetica", "bold");
    this.doc.setTextColor(0, 0, 0);
    this.doc.text("REQUESTOR INFORMATION", this.margin + 3, startY + 5);

    // Content box
    this.doc.rect(
      this.margin,
      startY + 8,
      this.pageWidth - this.margin * 2,
      20,
    );

    const leftCol = this.margin + 5;
    const rightCol = this.pageWidth / 2 + 5;

    // Vertical divider
    this.doc.line(
      this.pageWidth / 2,
      startY + 8,
      this.pageWidth / 2,
      startY + 28,
    );

    this.doc.setFontSize(10);

    // Left column
    this.doc.setFont("helvetica", "bold");
    this.doc.text("Department:", leftCol, startY + 15);
    this.doc.text("Requestor Name:", leftCol, startY + 21);

    this.doc.setFont("helvetica", "normal");
    this.doc.text(purchaseData.department || "N/A", leftCol + 35, startY + 15);
    this.doc.text(purchaseData.username || "N/A", leftCol + 35, startY + 21);

    // Right column - only Email now
    this.doc.setFont("helvetica", "bold");
    this.doc.text("Email:", rightCol, startY + 15);

    this.doc.setFont("helvetica", "normal");
    this.doc.text(purchaseData.email || "N/A", rightCol + 25, startY + 15);
  }

  addItemsTable(items) {
    const startY = 138;

    // Section header
    this.doc.setFillColor(248, 249, 250);
    this.doc.rect(
      this.margin,
      startY,
      this.pageWidth - this.margin * 2,
      8,
      "F",
    );
    this.doc.setDrawColor(0, 0, 0);
    this.doc.rect(this.margin, startY, this.pageWidth - this.margin * 2, 8);

    this.doc.setFontSize(11);
    this.doc.setFont("helvetica", "bold");
    this.doc.setTextColor(0, 0, 0);
    this.doc.text("ITEMS REQUESTED", this.margin + 3, startY + 5);

    const tableData = items.map((item, index) => [
      (index + 1).toString(),
      item.item_name || "N/A",
      item.description || "N/A",
      (item.quantity || 0).toLocaleString("id-ID"),
      new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(item.estimated_price || 0),
    ]);

    autoTable(this.doc, {
      startY: startY + 8,
      head: [["No", "Item Name", "Description", "Qty", "Total Price"]],
      body: tableData,
      theme: "striped",
      headStyles: {
        fillColor: [33, 37, 41],
        textColor: 255,
        fontStyle: "bold",
        fontSize: 9,
        halign: "center",
        cellPadding: 3,
      },
      bodyStyles: {
        fontSize: 8,
        cellPadding: 3,
        textColor: [0, 0, 0],
      },
      alternateRowStyles: {
        fillColor: [248, 249, 250],
      },
      columnStyles: {
        0: { halign: "center", cellWidth: 12 },
        1: { halign: "left", cellWidth: 50, headerHAlign: "left" }, // Item name - left aligned header and body
        2: { halign: "left", cellWidth: 60, headerHAlign: "left" }, // Description - left aligned header and body
        3: { halign: "center", cellWidth: 15 }, // Quantity
        4: { halign: "right", cellWidth: 43 }, // Total Price - adjusted to fit border
      },
      margin: { left: this.margin, right: this.margin },
      tableLineColor: [0, 0, 0],
      tableLineWidth: 0.1,
    });
  }

  addTotalSummary(purchaseData) {
    let currentY = this.doc.lastAutoTable
      ? this.doc.lastAutoTable.finalY + 10
      : 220;

    // Calculate totals - langsung dari estimated_price
    const total = purchaseData.items.reduce(
      (sum, item) => sum + (item.estimated_price || 0),
      0,
    );

    // Summary box
    const boxWidth = 60;
    const boxHeight = 15;
    const boxX = this.pageWidth - this.margin - boxWidth;

    this.doc.setDrawColor(0, 0, 0);
    this.doc.setLineWidth(0.3);
    this.doc.rect(boxX, currentY, boxWidth, boxHeight);

    // Summary content
    this.doc.setFontSize(10);

    // Total
    this.doc.setFont("helvetica", "bold");
    this.doc.text("TOTAL:", boxX + 3, currentY + 9);
    this.doc.text(
      new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(purchaseData.total_cost),
      boxX + 57,
      currentY + 9,
      { align: "right" },
    );
  }

  addFooter() {
    const pages = this.doc.internal.getNumberOfPages();

    for (let i = 1; i <= pages; i++) {
      this.doc.setPage(i);

      // Footer line
      this.doc.setDrawColor(200, 200, 200);
      this.doc.setLineWidth(0.2);
      this.doc.line(
        this.margin,
        this.pageHeight - 15,
        this.pageWidth - this.margin,
        this.pageHeight - 15,
      );

      this.doc.setFontSize(8);
      this.doc.setFont("helvetica", "normal");
      this.doc.setTextColor(100, 100, 100);

      this.doc.text(
        "Purchase Requisition Form",
        this.margin,
        this.pageHeight - 10,
      );

      this.doc.text(
        `Page ${i} of ${pages}`,
        this.pageWidth - this.margin - 20,
        this.pageHeight - 10,
      );

      this.doc.text(
        `Generated: ${new Date().toLocaleDateString("id-ID")} ${new Date().toLocaleTimeString("id-ID")}`,
        this.pageWidth / 2,
        this.pageHeight - 10,
        { align: "center" },
      );
    }
  }

  save(filename = "purchase-requisition.pdf") {
    this.doc.save(filename);
  }

  output(type = "blob") {
    return this.doc.output(type);
  }

  preview() {
    window.open(this.doc.output("bloburl"), "_blank");
  }
}
