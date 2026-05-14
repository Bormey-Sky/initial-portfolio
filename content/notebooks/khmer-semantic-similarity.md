---
slug: "khmer-semantic-similarity"
title: "Khmer semantic similarity: A study on word embedding for computing semantic similarity on Khmer text"
date: "2024-12-06"
tag: "Khmer Semantic Similarity"
subtitle: "Computer Science · Bachelor's Thesis"
type: "Bachelor's Thesis"
pdf: "/papers/khmer-semantic-similarity.pdf"
summary: "This research conducted multiple experiments on the effect of vector dimension on similarity classification and two similarity measurements with Cosine Similarity and Euclidean Distance. The evaluation metrics used are accuracy, precision, recall, and f1-score. The findings of this research showed the performance of FastText word embedding model with the accuracy rate 94.5%."
---


# Khmer Semantic Similarity: Word Embedding for Computing Text Similarity

## Overview

This research investigates and compares two word embedding methods—**TF-IDF** and **FastText**—for computing semantic similarity in Khmer text. The study addresses the limited availability of NLP tools for low-resource languages, particularly Khmer, by developing and evaluating models that can automatically measure the similarity between Khmer documents.

---

## Research Questions

The study sought to answer three key questions:

1. **How does the dimension of word representation affect semantic similarity classification?**
2. **How accurate is static word representation compared to word embedding models for Khmer?**
3. **How can word representation be utilized for text comparison?**

---

## Methodology

### Dataset Creation

- **Source**: 20,000 news articles scraped from Khmer news websites (BTV, Khmerload, Sabaynews, B8-sport, Popular)
- **Approach**: Back-translation pipeline
  - Original Khmer text → English translation (via Google Translate)
  - Text cleaning and preprocessing
  - Back-translation to Khmer to create semantically similar pairs
  - Manual annotation: paired texts labeled as similar (1) or dissimilar (0)

### Data Preprocessing

The pipeline included:
- **Word segmentation** using khmer-nltk (essential for Khmer's non-space-delimited structure)
- **Character removal** (punctuation, digits, special characters, Khmer-specific symbols)
- **Stop word removal** using a predefined Khmer stop word list
- **Feature extraction** using dimensionality reduction techniques

### Word Embedding Methods

**TF-IDF (Term Frequency-Inverse Document Frequency)**
- Traditional statistical approach
- Weights words based on their frequency in documents
- Best performance: 87.7% accuracy with 145-dimensional vectors

**FastText**
- Neural word embedding model (Facebook AI Research)
- Represents words using character n-grams, capturing subword information
- Particularly effective for morphologically complex languages
- Best performance: 94.5% accuracy with 100-dimensional vectors

### Similarity Measurements

- **Cosine Similarity**: Measures the angle between vectors in multidimensional space
- **Euclidean Distance**: Calculates straight-line distance between points

---

## Key Findings

### 1. Dimensionality Reduction Impact

For **TF-IDF with Cosine Similarity**:
- Original dimension: 48,796 → Accuracy: 76.1%
- Optimal dimension (min_df=0.1): 145 → Accuracy: **87.7%**
- Reduction improved F1-score from 68.7% to 86.3%

For **TF-IDF with Euclidean Distance**:
- Optimal performance at 1,636 dimensions with 98% accuracy
- Suggests Euclidean Distance requires higher dimensionality

### 2. FastText Outperforms TF-IDF

| Model | Similarity Measure | Accuracy | Precision | Recall | F1-Score | Vector Dim |
|-------|-------------------|----------|-----------|--------|----------|-----------|
| TF-IDF | Cosine | 87.7% | 97.3% | 77.6% | 86.3% | 145 |
| FastText | Cosine | **94.5%** | 97.8% | 91.1% | **94.3%** | 100 |

**Key Advantage**: FastText achieves higher accuracy with fewer dimensions (100 vs. 145), making it more efficient for practical applications.

### 3. Cosine Similarity as Optimal Metric

Cosine Similarity consistently outperformed Euclidean Distance for both models, providing more reliable similarity classification for Khmer text.

---

## Technical Implementation

### Web Application Prototype

A demonstration web application was developed using:
- **Frontend**: Jinja (Python template engine) + HTML/CSS
- **Backend**: FastAPI (modern Python web framework)
- **Database**: Supabase
- **Model**: FastText with Cosine Similarity

**Features**:
- User uploads Khmer text or document
- System processes and embeds the text
- Returns top 10 semantically similar news articles from the database
- Simple, intuitive interface for researchers and developers

### Technology Stack

- **Language**: Python 3
- **Libraries**: 
  - scikit-learn (TF-IDF vectorization)
  - Gensim (word embedding)
  - SciPy (similarity calculations)
  - khmer-nltk (Khmer text processing)
- **Development**: Visual Studio Code, Google Colab (GPU training)
- **Version Control**: GitHub

---

## Contributions & Significance

### Research Contributions

1. **First comprehensive comparison** of TF-IDF vs. FastText for Khmer semantic similarity
2. **Standardized dataset** of 12,636+ Khmer text pairs for model training and evaluation
3. **Practical web application** demonstrating real-world usage
4. **Insights on dimensionality reduction** for Khmer embedding models

### Practical Applications

- **Document clustering**: Group similar Khmer documents automatically
- **Information retrieval**: Enhanced search engines for Khmer content
- **Sentiment analysis**: Foundation for emotion detection systems
- **Machine translation**: Support for Khmer language technology development
- **Content recommendation**: Suggest relevant articles to users

---

## Limitations

- Limited to well-formed Khmer text (grammar and spelling errors not handled)
- Model trained specifically on news articles (domain-specific)
- No handling of grammatical or spelling errors
- Focused on document-level rather than word-level similarity

---

## Recommendations for Future Work

1. **Advanced Models**: Explore BERT and GPT-based embeddings for Khmer
2. **File Handling**: Extend web app to accept larger file uploads
3. **Error Tolerance**: Incorporate handling of grammatically incorrect text
4. **Transfer Learning**: Leverage multilingual pre-trained models
5. **Benchmark Dataset**: Create standardized public Khmer STS dataset
6. **Cross-lingual**: Extend to similar low-resource languages (Thai, Lao, Vietnamese)

---

## Evaluation Metrics Used

- **Accuracy**: Overall correctness of classifications
- **Precision**: Correct positive predictions / all positive predictions
- **Recall**: Correct positive predictions / all actual positives
- **F1-Score**: Harmonic mean of precision and recall (balanced performance measure)

---

## Conclusion

This research successfully demonstrates that **FastText is a superior embedding method for Khmer semantic similarity** compared to traditional TF-IDF, achieving 94.5% accuracy with efficient 100-dimensional representations. The developed prototype provides a practical foundation for building Khmer language processing tools and can serve as a stepping stone for further NLP research on low-resource languages.

The methodology—particularly the back-translation approach for creating parallel datasets—is transferable to other languages and could benefit the broader NLP community in developing tools for understudied linguistic systems.

---

## Author

**Bormey Chanchem**  
Bachelor of Science in Computer Science  
Paragon International University, Cambodia, 2024

**Advisor**: Dr. Chamroeun Khim  
**Supervisor**: Mr. Neil Ian C. Uy, MSIT

<!-- ---

## Citation

```bibtex
@thesis{chanchem2024khmer,
  author = {Chanchem, Bormey},
  title = {Khmer Semantic Similarity: A Study on Word Embedding 
           for Computing Semantic Similarity on Khmer Text},
  school = {Paragon International University},
  year = {2024},
  type = {Bachelor's Thesis}
}
```

--- -->

<!-- *For more information, code, and technical details, visit the [GitHub repository](https://github.com/Bormey-Sky).* -->