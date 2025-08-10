
# **AcademiaDrive - University Notes Sharing Platform**

Welcome to **AcademiaDrive**, a platform designed to solve the problem of accessing and sharing study materials within your university or college. If your university doesn't provide easy access to study materials, or if you just want to make your own notes available to others, **AcademiaDrive** is the solution.

The platform takes your existing Google Drive-based file-sharing system and upgrades it to a **GitHub Pages**-hosted website, making it more user-friendly and easily accessible for everyone in your college or university.

### **How It Works:**

**AcademiaDrive** allows you to create, upload, and share your notes in a simple, clean way. All you need to do is create a folder structure inside the **public** folder, upload your notes, and the website automatically reflects the changes.

<img src="./public/acadmicdrive.gif" width="1000" />
---

## **How to Use and Contribute:**

### 1. **Fork the Repository:**

* Visit the [AcademiaDrive GitHub Repository](https://github.com/yourusername/academiadrive).
* Click the **Fork** button on the top-right to create a copy of this repository under your GitHub account.

### 2. **Clone the Repository:**

After forking, clone the repository to your local machine:

```bash
git clone https://github.com/yourusername/academiadrive.git
cd academiadrive
```

### 3. **Upload Your Notes:**

* Inside the **public** folder, create folders to organize your notes however you like. It can be by course, subject, or even by specific topics.
* You can add any kind of study material, such as PDF files, notes, slides, videos, and more.
* Example structure:

  ```
  public/academiadrive/
  ├── Math101/
  │   └── Math_Notes.pdf
  ├── CS201/
  │   └── CS_Slides.pdf
  ├── Physics/
  │   └── Physics_Notes.pdf
  ├── Videos/
  │   └── Lecture1.mp4
  ```

### 4. **Commit Your Changes:**

Once you've added your notes, commit and push your changes:

```bash
git add .
git commit -m "Added Math101 and CS201 notes"
git push origin main
```

### 5. **Create a Pull Request (PR):**

* After pushing your changes, go to the **Pull Requests** tab and create a **New Pull Request** to merge your changes into the main repository. This will make your notes available to everyone in your university or college.

### 6. **Accessing Notes:**

* After your changes are merged, the newly added notes will be accessible through the website hosted on GitHub Pages.
* Students can browse the folders by course, subject, or topic and download the materials they need.

---


## **Folder Structure Explanation:**

You have full flexibility to organize your notes however you like! Here are a few examples of how to structure your folders within `public/academiadrive/`:

### 1. **By Course:**

Organize your notes by course name or code:

```plaintext
public/academiadrive/
├── CS101/
├── MATH201/
├── BIO102/
```

### 2. **By Subject:**

Organize your notes by subject area, such as Math, Computer Science, or Physics:

```plaintext
public/academiadrive/
├── Math/
├── ComputerScience/
├── Physics/
```

### 3. **By Topic:**

Organize your notes by specific topics or modules within the course:

```plaintext
public/academiadrive/
├── LinearAlgebra/
├── DataStructures/
├── MachineLearning/
```

---



## **Technologies Used:**

* **GitHub**: To host the repository and manage contributions.
* **GitHub Pages**: To host the website and provide easy access to notes.
* **HTML/CSS**: Basic styling and structure for the web interface.
* **JavaScript (Optional)**: If you choose to add interactive features, you can use JavaScript.

---

## **How to Access Notes:**

1. Go to the **AcademiaDrive** website hosted on GitHub Pages.
2. Browse through the folders organized by course, subject, or topic.
3. Click to view or download the study materials (PDFs, slides, videos, etc.) that you need.

---

## **Contributing Guidelines:**

1. **Be Respectful**: This is a community-driven platform. Please contribute in a way that helps others and maintains a collaborative environment.
2. **Stay Organized**: Keep your folder structure clean and easy to navigate so others can quickly find the materials they need.
3. **Naming Conventions**: Please follow a simple naming convention for your notes so that they are easily identifiable.

---

## **Need Help?**

If you run into any issues or have questions, feel free to open an issue on the GitHub repository or reach out to the project maintainers.

---

### **Join the Community:**

By contributing your notes to **AcademiaDrive**, you're helping make academic resources more accessible to everyone in your university or college. Let’s work together to ensure that every student has access to the materials they need to succeed.

---

### **License:**

This project is licensed under the [License](LICENSE).

---

### **Conclusion:**

The goal of **AcademiaDrive** is to make it easy for students within your university or college to access and share study materials. Instead of relying on external services like Google Drive, **AcademiaDrive** takes it a step further by providing a **dedicated website** that anyone in your university can access and contribute to.

This solution is scalable and can be easily adapted to other universities or colleges facing similar challenges.
